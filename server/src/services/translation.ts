import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

import { ITranslation } from '../../../types/Translation';
import { PLUGIN_ID } from '../../../admin/src/pluginId';

const uid = `plugin::${PLUGIN_ID}.translation`;

const translation = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get({ namespace, key, page = 1 }) {
    const filters = {};
    const params = {
      fields: ['key', 'translations', 'namespace'],
      sort: 'key:asc',
      limit: 10,
      start: (page - 1) * 10,
    };

    if (namespace) {
      filters['namespace'] = {
        $eqi: namespace,
      };
    }

    if (key) {
      filters['key'] = {
        $containsi: key,
      };
    }

    const totalItems = await strapi.documents(uid).count({ filters });

    const items = await strapi.documents(uid).findMany({
      ...params,
      filters,
    });

    return {
      items,
      pagination: {
        page,
        totalItems,
        totalPages: Math.ceil(totalItems / 10),
      },
    };
  },
  async add(data: ITranslation) {
    return await strapi.documents(uid).create({ data });
  },

  async update(data: ITranslation) {
    return await strapi.documents(uid).update({
      documentId: data.documentId,
      data,
    });
  },
  async delete(id: string) {
    return await strapi.documents(uid).delete({
      documentId: id,
    });
  },
  async deleteAll(ctx) {
    const allDocumentIds = await strapi
      .documents(uid)
      .findMany({
        fields: ['documentId'],
      })
      .then((data) => data.map((item) => item.documentId));

    if (allDocumentIds.length === 0) ctx.throw(200, 'No translations to delete');

    try {
      for (const allDocumentId of allDocumentIds) {
        await strapi.documents(uid).delete({
          documentId: allDocumentId,
        });
      }
      ctx.send(200, 'All translations deleted');
    } catch (e) {
      ctx.throw(500, 'Failed to delete all translations');
    }
  },
  async exist(key: string, namespace: string) {
    return await strapi
      .documents(uid)
      .count({
        filters: {
          key: {
            $eqi: key,
          },
          namespace: {
            $eqi: namespace,
          },
        },
      })
      .then((count) => count > 0);
  },
  async uploadJson(ctx) {
    const { files } = ctx.request;
    const namespace = ctx.request.body.namespace;
    const locale = ctx.request.body.locale;

    // Ensure that a file is uploaded
    if (!files || !files.json) {
      return ctx.throw(400, 'No file uploaded');
    }

    const file = files.json;

    // Check if the uploaded file is a JSON file
    if (path.extname(file.originalFilename) !== '.json') {
      return ctx.throw(400, 'Please upload a JSON file');
    }

    // Read the uploaded file content
    const fileContent = fs.readFileSync(file.filepath, 'utf-8');

    // Parse the JSON content
    const jsonData = JSON.parse(fileContent);

    const keysToUploadOrUpdate = {};

    const failedKeys = [];
    const successKeys = [];
    const updatedKeys = [];

    /**
     * Get all translations for the namespace
     * @param {string} namespace
     */
    const allTranslations = await strapi.documents(uid).findMany({
      fields: ['key', 'translations'],
      filters: {
        namespace: {
          $eqi: namespace,
        },
      },
    });

    /**
     * Check if key and value are strings and if the key already exists
     * @param {string} key
     * @param {string} value
     */
    const canBeAdded = ({ key, value }: { key: string; value: string }) => {
      if (typeof key !== 'string' || typeof value !== 'string') {
        failedKeys.push(key);
        return false;
      }

      const exists = allTranslations.some((translation) => translation.key === key);

      if (!exists) return true;

      if (exists && allTranslations.some((translation) => !translation.translations[locale]))
        return true;

      failedKeys.push(key);
      return false;
    };

    /**
     * Iterate over the JSON data and check if the key can be added
     */
    for (const key in jsonData) {
      if (
        canBeAdded({
          key,
          value: jsonData[key],
        })
      ) {
        keysToUploadOrUpdate[key] = jsonData[key];
      } else if (typeof jsonData[key] === 'object') {
        for (const nestedKey in jsonData[key]) {
          if (
            canBeAdded({
              key: `${key}.${nestedKey}`,
              value: jsonData[key][nestedKey],
            })
          ) {
            keysToUploadOrUpdate[`${key}.${nestedKey}`] = jsonData[key][nestedKey];
          } else if (typeof jsonData[key][nestedKey] === 'object') {
            for (const nestedNestedKey in jsonData[key][nestedKey]) {
              if (
                canBeAdded({
                  key: `${key}.${nestedKey}.${nestedNestedKey}`,
                  value: jsonData[key][nestedKey][nestedNestedKey],
                })
              ) {
                keysToUploadOrUpdate[`${key}.${nestedKey}.${nestedNestedKey}`] =
                  jsonData[key][nestedKey][nestedNestedKey];
              }
            }
          }
        }
      }
    }

    /**
     * If there are keys to upload or update, do so
     */
    if (Object.keys(keysToUploadOrUpdate).length > 0) {
      for (const key in keysToUploadOrUpdate) {
        const existingTranslation = allTranslations.find((translation) => translation.key === key);

        if (existingTranslation) {
          await strapi.documents(uid).update({
            documentId: existingTranslation.documentId,
            translations: {
              ...existingTranslation.translations,
              [locale]: keysToUploadOrUpdate[key],
            },
          });

          updatedKeys.push(key);
        } else {
          await strapi.documents(uid).create({
            data: {
              key,
              namespace,
              translations: {
                [locale]: keysToUploadOrUpdate[key],
              },
            },
          });
        }

        successKeys.push(key);
      }
    }

    /**
     * Return a summary of the JSON upload
     */
    return {
      message: 'JSON upload summary',
      locale,
      namespace,
      failedKeys,
      successKeys,
      updatedKeys,
    };
  },

  async exportJson(ctx) {
    const namespaces: any[] = await strapi.plugin(PLUGIN_ID).config('namespaces');

    if (!namespaces || namespaces.length === 0) {
      ctx.throw(400, 'No namespaces found');
    }

    // Set headers for ZIP download
    ctx.set('Content-Disposition', 'attachment; filename=files.zip');
    ctx.set('Content-Type', 'application/zip');

    // todo: fetch all locales from the strapi
    const locales = [
      { code: 'en', name: 'English (en)' },
      { code: 'hr', name: 'Croatian (hr)' },
    ];

    const translations = await strapi.documents(uid).findMany({
      fields: ['key', 'translations', 'namespace'],
    });

    const jsonToDownload = {};

    locales.forEach((locale) => {
      namespaces.forEach((namespace) => {
        const data = translations.filter(
          (translation) => translation.namespace === namespace.value
        );

        data.forEach((translation) => {
          if (!jsonToDownload[`${locale.code}.${namespace.value}`]) {
            jsonToDownload[`${locale.code}.${namespace.value}`] = {};
          }

          jsonToDownload[`${locale.code}.${namespace.value}`][translation.key] =
            translation.translations[locale.code] || '';
        });
      });
    });

    // TODO: download each key inside jsonToDownload ad a separate file, and zip them all

    return jsonToDownload;
  },
});

export default translation;
