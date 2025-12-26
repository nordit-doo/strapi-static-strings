"use strict";
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const crypto__default = /* @__PURE__ */ _interopDefault(crypto);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const path__default = /* @__PURE__ */ _interopDefault(path);
const PLUGIN_ID = "strapi-static-strings";
const PLUGIN_NAMESPACE_TABLE_NAME = PLUGIN_ID.replace(/-/g, "_") + "_namespaces";
const PLUGIN_TRANSLATION_TABLE_NAME = PLUGIN_ID.replace(/-/g, "_") + "_translations";
const PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME = "strapi_static_strings_translations_namespace_lnk";
const bootstrap = async ({ strapi: strapi2 }) => {
  const knex = strapi2.db.connection;
  const tableNameTranslations = PLUGIN_TRANSLATION_TABLE_NAME;
  const settingsTable = "strapi_static_strings_settings";
  let hasSettingsTable = false;
  for (let i = 0; i < 10; i++) {
    hasSettingsTable = await knex.schema.hasTable(settingsTable);
    if (hasSettingsTable) break;
    strapi2.log.info("[strapi-static-strings] Waiting for settings table...");
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!hasSettingsTable) {
    strapi2.log.warn("[strapi-static-strings] Settings table not found — skipping bootstrap");
    return;
  }
  const existing = await knex(settingsTable).where({ key: "apiKey" }).first();
  if (!existing) {
    const newKey = crypto__default.default.randomUUID();
    await knex(settingsTable).insert({ key: "apiKey", value: newKey });
    strapi2.log.info(`[strapi-static-strings] Created default API key: ${newKey}`);
  }
  const locales = await strapi2.plugin("i18n").service("locales").find();
  const localeCodes = locales.map((l) => l.code);
  const existingColumns = await knex(tableNameTranslations).columnInfo();
  const existingColumnNames = Object.keys(existingColumns);
  for (const locale of localeCodes) {
    if (!existingColumnNames.includes(locale)) {
      strapi2.log.info(`[strapi-static-strings] Adding missing column: ${locale}`);
      await knex.schema.alterTable(tableNameTranslations, (table) => {
        table.text(locale);
      });
    }
  }
};
const destroy = ({ strapi: strapi2 }) => {
};
const register = ({ strapi: strapi2 }) => {
};
const config = {
  default: {},
  validator() {
  }
};
const collectionName$3 = "strapi_static_strings_namespaces";
const info$3 = {
  singularName: "namespace",
  pluralName: "namespaces",
  displayName: "Namespace"
};
const options$3 = {
  draftAndPublish: false
};
const attributes$3 = {
  description: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  project: {
    type: "relation",
    relation: "manyToOne",
    target: "plugin::strapi-static-strings.project",
    inversedBy: "namespaces"
  },
  translations: {
    type: "relation",
    relation: "oneToMany",
    target: "plugin::strapi-static-strings.translation",
    mappedBy: "namespace"
  }
};
const namespace$1 = {
  collectionName: collectionName$3,
  info: info$3,
  options: options$3,
  attributes: attributes$3
};
const collectionName$2 = "strapi_static_strings_projects";
const info$2 = {
  singularName: "project",
  pluralName: "projects",
  displayName: "Project"
};
const options$2 = {
  draftAndPublish: false
};
const attributes$2 = {
  description: {
    type: "string",
    required: false,
    unique: false
  },
  name: {
    type: "string",
    required: true,
    unique: true
  },
  namespaces: {
    type: "relation",
    relation: "oneToMany",
    target: "plugin::strapi-static-strings.namespace",
    mappedBy: "project"
  }
};
const project$1 = {
  collectionName: collectionName$2,
  info: info$2,
  options: options$2,
  attributes: attributes$2
};
const collectionName$1 = "strapi_static_strings_settings";
const info$1 = {
  singularName: "setting",
  pluralName: "settings",
  displayName: "Setting"
};
const options$1 = {
  draftAndPublish: false
};
const attributes$1 = {
  key: {
    type: "string",
    unique: true,
    required: true
  },
  value: {
    type: "text",
    required: true
  }
};
const setting$1 = {
  collectionName: collectionName$1,
  info: info$1,
  options: options$1,
  attributes: attributes$1
};
const kind = "collectionType";
const collectionName = "strapi_static_strings_translations";
const info = {
  name: "Translation",
  displayName: "Translation",
  singularName: "translation",
  pluralName: "translations",
  description: "Stores translation keys with their corresponding translations and namespaces"
};
const options = {
  draftAndPublish: false
};
const pluginOptions = {
  "content-manager": {
    visible: true
  },
  "content-type-builder": {
    visible: true
  }
};
const attributes = {
  en: {
    type: "text"
  },
  key: {
    type: "string",
    required: true
  },
  translations: {
    type: "json",
    required: true
  },
  namespace: {
    type: "relation",
    relation: "manyToOne",
    target: "plugin::strapi-static-strings.namespace",
    inversedBy: "translations"
  }
};
const translation$2 = {
  kind,
  collectionName,
  info,
  options,
  pluginOptions,
  attributes
};
const contentTypes = {
  namespace: { schema: namespace$1 },
  project: { schema: project$1 },
  setting: { schema: setting$1 },
  translation: { schema: translation$2 }
};
const cliController = {
  async cliFindLocales(ctx) {
    const locales = await strapi.plugin("i18n").service("locales").find();
    ctx.send({ items: locales });
  },
  async cliGetProjectData(ctx) {
    const { projectId: projectDocumentId } = ctx.params;
    try {
      const project2 = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).findOne({ where: { document_id: projectDocumentId } });
      if (!project2) {
        return ctx.notFound("Project not found");
      }
      const projectId = project2.id;
      const locales = await strapi.plugin("i18n").service("locales").find();
      const languages = locales.map((l) => l.code);
      const namespaces = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).findMany({ where: { project: projectId }, orderBy: { name: "asc" } });
      if (namespaces.length === 0) {
        return ctx.send({ projectId: projectDocumentId, languages, namespaces: [] });
      }
      const allTranslations = await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).findMany({
        where: { namespace: { project: projectId } },
        populate: ["namespace"],
        orderBy: { key: "asc" }
      });
      if (allTranslations.length === 0) {
        const ns2 = namespaces.map((ns3) => ({ id: ns3.id, name: ns3.name, translations: {} }));
        return ctx.send({ projectId: projectDocumentId, languages, namespaces });
      }
      const knex = strapi.db.connection;
      const fullRows = await knex(PLUGIN_TRANSLATION_TABLE_NAME).select("*").whereIn(
        "id",
        allTranslations.map((t) => t.id)
      );
      const translationsMeta = {};
      for (const t of allTranslations) {
        translationsMeta[t.id] = { nsId: t.namespace.id, nsName: t.namespace.name, key: t.key };
      }
      const namespaceMap = {};
      for (const ns2 of namespaces) {
        namespaceMap[ns2.name] = { id: ns2.id, name: ns2.name, translations: {} };
      }
      for (const row of fullRows) {
        const meta = translationsMeta[row.id];
        if (!meta) {
          continue;
        }
        const nsName = meta.nsName;
        const formatted = {};
        for (const lang of languages) {
          if (row[lang] !== void 0 && row[lang] !== null) {
            formatted[lang] = row[lang];
          }
        }
        namespaceMap[nsName].translations[meta.key] = formatted;
      }
      const ns = Object.values(namespaceMap);
      ctx.send({ projectId: projectDocumentId, languages, namespaces: ns });
    } catch (error) {
      strapi.log.error("Error in cliGetProjectData:", error);
      ctx.throw(500, "Failed to fetch project data");
    }
  },
  async cliSyncTranslations(ctx) {
    const { projectId: projectDocumentId } = ctx.params;
    const { namespace: namespace2, translations } = ctx.request.body;
    const project2 = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).findOne({ where: { documentId: projectDocumentId } });
    if (!project2) {
      return ctx.notFound("Project not found");
    }
    const projectId = project2.id;
    if (!namespace2 || !translations) {
      return ctx.badRequest("Missing namespace or translations");
    }
    let ns = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).findOne({ where: { name: namespace2, project: projectId } });
    if (!ns) {
      ns = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).create({
        data: {
          name: namespace2,
          description: `Auto-created via CLI`,
          project: projectId
        }
      });
    }
    const knex = strapi.db.connection;
    const existing = [];
    const created = [];
    for (const [key, langs] of Object.entries(translations)) {
      const exist = await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).findOne({ where: { key, namespace: ns.id } });
      if (exist) {
        existing.push(key);
        continue;
      }
      const langObj = langs;
      const [id] = await knex(PLUGIN_TRANSLATION_TABLE_NAME).insert({ key, ...langObj, created_at: /* @__PURE__ */ new Date(), updated_at: /* @__PURE__ */ new Date() }).returning("id");
      await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME).insert({
        translation_id: id.id ?? id,
        namespace_id: ns.id
      });
      created.push(key);
    }
    ctx.send({
      ok: true,
      namespaceId: ns.id,
      createdCount: created.length,
      existingCount: existing.length,
      existingKeys: existing
    });
  },
  async cliSyncTranslationOverwrite(ctx) {
    const { namespace: namespace2, translationKey, translations } = ctx.request.body;
    const { projectId } = ctx.params;
    const project2 = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).findOne({ where: { documentId: projectId } });
    if (!project2) return ctx.notFound("Project not found");
    const namespaceRecord = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).findOne({ where: { name: namespace2, project: project2.id } });
    if (!namespaceRecord) return ctx.notFound(`Namespace "${namespace2}" not found`);
    const knex = strapi.db.connection;
    const linkTable = PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME;
    const exist = await knex(`${PLUGIN_TRANSLATION_TABLE_NAME} as t`).join({ lnk: linkTable }, "lnk.translation_id", "t.id").where("lnk.namespace_id", namespaceRecord.id).andWhere("t.key", translationKey).first();
    if (exist) {
      await knex(PLUGIN_TRANSLATION_TABLE_NAME).where({ id: exist.id }).update({ ...translations, updated_at: /* @__PURE__ */ new Date() });
      return ctx.send({ updated: true });
    }
    const [inserted] = await knex(PLUGIN_TRANSLATION_TABLE_NAME).insert({
      key: translationKey,
      ...translations,
      created_at: /* @__PURE__ */ new Date(),
      updated_at: /* @__PURE__ */ new Date()
    }).returning("id");
    await knex(linkTable).insert({
      translation_id: inserted.id ?? inserted,
      namespace_id: namespaceRecord.id
    });
    ctx.send({ created: true });
  }
};
const namespaceController = {
  /*************************************************************************************************
   * NAMESPACE controllers - query
   *************************************************************************************************/
  async namespaceFindNamespaces(ctx) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const namespaceRepo = strapi.db.query(`plugin::${PLUGIN_ID}.namespace`);
    const namespaces = await namespaceRepo.findMany({
      where: { project: ctx.params.projectId },
      limit: pageSize,
      offset: start,
      orderBy: { name: "asc" }
    });
    const total = await namespaceRepo.count({ where: { project: ctx.params.projectId } });
    ctx.body = {
      items: namespaces,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) }
    };
  },
  async namespaceFindNamespacesAll(ctx) {
    const namespaceRepo = strapi.db.query(`plugin::${PLUGIN_ID}.namespace`);
    const namespaces = await namespaceRepo.findMany({
      where: { project: ctx.params.projectId },
      orderBy: { name: "asc" }
    });
    ctx.body = namespaces;
  },
  async namespaceFindNamespaceById(ctx) {
    const { namespaceId } = ctx.params;
    const namespace2 = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).findOne({ where: { id: namespaceId }, populate: ["translations"] });
    ctx.body = namespace2;
  },
  async namespaceFindNamespacesWithMissingTranslations(ctx) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const projectId = Number(ctx.params.projectId);
    const search = ctx.query.search ? String(ctx.query.search).trim() : "";
    const knex = strapi.db.connection;
    const locales = await strapi.plugin("i18n").service("locales").find();
    const localeCodes = locales.map((l) => l.code);
    const nsMeta = strapi.db.metadata.get(`plugin::${PLUGIN_ID}.namespace`);
    const nsToTr = nsMeta.attributes.translations;
    const nsToPr = nsMeta.attributes.project;
    const nsTrJoinTable = nsToTr.joinTable.name;
    const nsTrJoinCol = nsToTr.joinTable.joinColumn.name;
    const nsTrInvCol = nsToTr.joinTable.inverseJoinColumn.name;
    let projectJoin = null;
    if ("joinTable" in nsToPr) {
      projectJoin = {
        table: nsToPr.joinTable.name,
        nsKey: nsToPr.joinTable.joinColumn.name,
        prKey: nsToPr.joinTable.inverseJoinColumn.name
      };
    } else if ("columnName" in nsToPr) {
      projectJoin = null;
    }
    const nsTable = PLUGIN_NAMESPACE_TABLE_NAME;
    const trTable = PLUGIN_TRANSLATION_TABLE_NAME;
    const missingCondition = localeCodes.map((lang) => `t.${lang} IS NULL OR t.${lang} = ''`).join(" OR ");
    const query = knex({ n: nsTable }).select(
      "n.id",
      "n.name",
      "n.description",
      knex.raw(`
        COALESCE(CAST(
          COUNT(DISTINCT t.id) FILTER (WHERE ${missingCondition})
          AS INTEGER
        ), 0) AS "missingTranslationsCount"
      `),
      knex.raw(`
        COALESCE(CAST(COUNT(DISTINCT t.id) AS INTEGER), 0) AS "totalTranslationsCount"
      `)
    ).modify((qb) => {
      if (projectJoin) {
        qb.join({ np: projectJoin.table }, `np.${projectJoin.nsKey}`, "n.id").where(
          `np.${projectJoin.prKey}`,
          projectId
        );
      } else {
        qb.where("n.project_id", projectId);
      }
      if (search) {
        qb.where((builder) => {
          builder.where("n.name", "ilike", `%${search}%`).orWhere("n.description", "ilike", `%${search}%`);
        });
      }
    }).leftJoin({ nt: nsTrJoinTable }, `nt.${nsTrJoinCol}`, "n.id").leftJoin({ t: trTable }, "t.id", `nt.${nsTrInvCol}`).groupBy("n.id").orderBy("n.name", "asc").limit(pageSize).offset(start);
    const items = await query;
    const totalQuery = knex({ n: nsTable }).count("* as count").modify((qb) => {
      if (projectJoin) {
        qb.join({ np: projectJoin.table }, `np.${projectJoin.nsKey}`, "n.id").where(
          `np.${projectJoin.prKey}`,
          projectId
        );
      } else {
        qb.where("n.project_id", projectId);
      }
      if (search) {
        qb.where((builder) => {
          builder.where("n.name", "ilike", `%${search}%`).orWhere("n.description", "ilike", `%${search}%`);
        });
      }
    });
    const total = Number((await totalQuery.first())?.count ?? 0);
    ctx.body = {
      items,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) }
    };
  },
  /*************************************************************************************************
   * NAMESPACE controllers - mutation
   *************************************************************************************************/
  async namespaceCreateNamespace(ctx) {
    const { projectId } = ctx.params;
    const { description, name } = ctx.request.body;
    const newNamespace = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).create({ data: { description, name, project: { connect: { id: projectId } } } });
    ctx.body = newNamespace;
  },
  async namespaceUpdateNamespace(ctx) {
    const { namespaceId } = ctx.params;
    const { name, description } = ctx.request.body;
    const updatedNamespace = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).update({ where: { id: namespaceId }, data: { name, description } });
    ctx.body = updatedNamespace;
  },
  async namespaceDeleteNamespace(ctx) {
    const { namespaceId } = ctx.params;
    try {
      const knex = strapi.db.connection;
      const translationIds = await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME).where("namespace_id", namespaceId).pluck("translation_id");
      if (translationIds.length > 0) {
        await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME).where("namespace_id", namespaceId).delete();
        await knex(PLUGIN_TRANSLATION_TABLE_NAME).whereIn("id", translationIds).delete();
      }
      await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).delete({ where: { id: namespaceId } });
      ctx.body = { namespaceId, success: true };
    } catch (error) {
      strapi.log.error("Error deleting namespace and translations:", error);
      ctx.throw(500, "Failed to delete namespace and translations");
    }
  }
};
const projectController = {
  async projectFindProjects(ctx) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const projectRepo = strapi.db.query(`plugin::${PLUGIN_ID}.project`);
    const projects = await projectRepo.findMany({
      populate: ["namespaces"],
      limit: pageSize,
      offset: start,
      orderBy: { createdAt: "desc" }
    });
    const total = await projectRepo.count();
    ctx.body = {
      items: projects,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) }
    };
  },
  async projectFindProjectById(ctx) {
    const { projectId } = ctx.params;
    const project2 = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).findOne({ where: { id: projectId }, populate: ["namespaces"] });
    ctx.body = project2;
  },
  async projectCreateProject(ctx) {
    const { name, description } = ctx.request.body;
    const newProject = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).create({ data: { name, description } });
    ctx.body = newProject;
  },
  async projectUpdateProject(ctx) {
    const { projectId } = ctx.params;
    const { name, description } = ctx.request.body;
    const updatedProject = await strapi.db.query(`plugin::${PLUGIN_ID}.project`).update({ where: { id: projectId }, data: { name, description } });
    ctx.body = updatedProject;
  },
  async projectDeleteProject(ctx) {
    const { projectId } = ctx.params;
    try {
      const namespaces = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).findMany({ where: { project: projectId }, select: ["id"] });
      const namespaceIds = namespaces.map((ns) => ns.id);
      if (namespaceIds.length > 0) {
        await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).deleteMany({
          where: { namespace: { $in: namespaceIds } }
        });
      }
      await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).deleteMany({
        where: { project: projectId }
      });
      await strapi.db.query(`plugin::${PLUGIN_ID}.project`).delete({ where: { id: projectId } });
      ctx.body = { success: true, projectId };
    } catch (error) {
      strapi.log.error("Error deleting project:", error);
      ctx.throw(500, "Failed to delete project and related entities");
    }
  }
};
const settingsController = {
  async settingsFind(ctx) {
    try {
      const settings = await strapi.db.query("plugin::strapi-static-strings.setting").findMany();
      ctx.body = { data: settings };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error fetching settings: ${err.message}`);
      ctx.throw(500, "Failed to fetch settings");
    }
  },
  async settingsFindApiKey(ctx) {
    try {
      const record = await strapi.db.query("plugin::strapi-static-strings.setting").findOne({ where: { key: "apiKey" } });
      if (!record) {
        ctx.throw(404, "API key not found");
      }
      ctx.body = { value: record.value };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error fetching API key: ${err.message}`);
      ctx.throw(500, "Failed to fetch API key");
    }
  },
  async settingsRegenerateApiKey(ctx) {
    try {
      const newKey = crypto__default.default.randomUUID();
      const existing = await strapi.db.query("plugin::strapi-static-strings.setting").findOne({ where: { key: "apiKey" } });
      if (existing) {
        await strapi.db.query("plugin::strapi-static-strings.setting").update({
          where: { key: "apiKey" },
          data: { value: newKey }
        });
      } else {
        await strapi.db.query("plugin::strapi-static-strings.setting").create({
          data: { key: "apiKey", value: newKey }
        });
      }
      strapi.log.info(`[strapi-static-strings] API key regenerated`);
      ctx.body = { value: newKey };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error regenerating API key: ${err.message}`);
      ctx.throw(500, "Failed to regenerate API key");
    }
  }
};
const tableName = PLUGIN_TRANSLATION_TABLE_NAME;
const tableNamespaceLink = PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME;
const translationController = {
  /*************************************************************************************************
   * TRANSLATION controllers - query
   *************************************************************************************************/
  async translationFindTranslations(ctx) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const namespaceId = Number(ctx.params.namespaceId);
    const showMissingOnly = String(ctx.query.showMissingOnly) === "true";
    const searchQuery = String(ctx.query.search || "").trim();
    const knex = strapi.db.connection;
    const table = PLUGIN_TRANSLATION_TABLE_NAME;
    const locales = await strapi.plugin("i18n").service("locales").find();
    const localeCodes = locales.map((l) => l.code);
    const meta = strapi.db.metadata.get(`plugin::${PLUGIN_ID}.translation`);
    const nsAttr = meta.attributes.namespace;
    let query = knex({ t: table }).select("t.*").orderBy("t.key", "asc").limit(pageSize).offset(start);
    let countQuery = knex({ t: table }).count(" * as count");
    if ("columnName" in nsAttr && nsAttr.columnName) {
      query = query.where(`t.${nsAttr.columnName}`, namespaceId);
      countQuery = countQuery.where(`t.${nsAttr.columnName}`, namespaceId);
    } else if ("joinTable" in nsAttr && nsAttr.joinTable && "name" in nsAttr.joinTable && "joinColumn" in nsAttr.joinTable && "inverseJoinColumn" in nsAttr.joinTable && nsAttr.joinTable.name && nsAttr.joinTable.joinColumn?.name && nsAttr.joinTable.inverseJoinColumn?.name) {
      const jtName = nsAttr.joinTable.name;
      const jtJoinCol = nsAttr.joinTable.joinColumn.name;
      const jtInverseCol = nsAttr.joinTable.inverseJoinColumn.name;
      query = query.join({ jt: jtName }, `jt.${jtJoinCol}`, "t.id").where(`jt.${jtInverseCol}`, namespaceId);
      countQuery = countQuery.join({ jt: jtName }, `jt.${jtJoinCol}`, "t.id").where(`jt.${jtInverseCol}`, namespaceId);
    } else {
      ctx.throw(500, "Namespace relation not mapped (no columnName or joinTable).");
    }
    if (showMissingOnly && localeCodes.length) {
      const addMissingClause = function() {
        for (const lang of localeCodes) {
          this.orWhereNull(`t.${lang}`).orWhere(`t.${lang}`, "");
        }
      };
      query.andWhere(addMissingClause);
      countQuery.andWhere(addMissingClause);
    }
    if (searchQuery) {
      const addSearchClause = function() {
        this.where(`t.key`, "like", `%${searchQuery}%`);
        for (const lang of localeCodes) {
          this.orWhere(`t.${lang}`, "like", `%${searchQuery}%`);
        }
      };
      query.andWhere(addSearchClause);
      countQuery.andWhere(addSearchClause);
    }
    const items = await query;
    const total = Number((await countQuery.first())?.count ?? 0);
    ctx.body = {
      items,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) }
    };
  },
  async translationFindTranslationById(ctx) {
    const { translationId } = ctx.params;
    const namespace2 = await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).findOne({ where: { id: translationId } });
    ctx.body = namespace2;
  },
  async translationFindTranslationsMissingCountAnyLanguage(ctx) {
    const knex = strapi.db.connection;
    const locales = await strapi.plugin("i18n").service("locales").find();
    const localeCodes = locales.map((l) => l.code);
    const result = await knex(tableName).count("* as count").where(function() {
      for (const lang of localeCodes) {
        this.orWhereNull(lang).orWhere(lang, "");
      }
    }).first();
    ctx.body = {
      count: Number(result.count),
      locales: localeCodes
    };
  },
  /*************************************************************************************************
   * TRANSLATION controllers - mutation
   *************************************************************************************************/
  async translationCreateTranslation(ctx) {
    const { namespaceId } = ctx.params;
    const { key, translations } = ctx.request.body;
    if (!key || !namespaceId) {
      ctx.throw(400, "Key and namespace are required");
    }
    const knex = strapi.db.connection;
    const existing = await knex(tableName).join({ lnk: tableNamespaceLink }, "lnk.translation_id", `${tableName}.id`).where("lnk.namespace_id", namespaceId).andWhere(`${tableName}.key`, key).first();
    if (existing) {
      ctx.throw(400, "Translation already exists");
    }
    const data = { key, created_at: /* @__PURE__ */ new Date(), updated_at: /* @__PURE__ */ new Date() };
    for (const [lang, value] of Object.entries(translations || {})) {
      data[lang] = value ?? null;
    }
    const existingColumns = Object.keys(await knex(tableName).columnInfo());
    for (const field of Object.keys(data)) {
      if (!existingColumns.includes(field)) {
        delete data[field];
      }
    }
    const [insertedId] = await knex(tableName).insert(data).returning("id");
    await knex(tableNamespaceLink).insert({
      translation_id: insertedId.id ?? insertedId,
      namespace_id: namespaceId
    });
    const newTranslation = await knex(tableName).where({ id: insertedId.id ?? insertedId }).first();
    ctx.send(newTranslation);
  },
  async translationUpdateTranslation(ctx) {
    const { translationId } = ctx.params;
    const { key, translations } = ctx.request.body;
    if (!key) {
      ctx.throw(400, "Key is required");
    }
    const knex = strapi.db.connection;
    const data = { key, updated_at: /* @__PURE__ */ new Date() };
    for (const [lang, value] of Object.entries(translations)) {
      data[lang] = value ?? "";
    }
    await knex(tableName).where({ id: translationId }).update(data);
    const updated = await knex(tableName).where({ id: translationId }).first();
    ctx.send(updated);
  },
  async translationDeleteTranslation(ctx) {
    const { translationId } = ctx.params;
    await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).delete({
      where: { id: translationId }
    });
    ctx.body = { translationId, success: true };
  }
};
const controller = () => ({
  ...cliController,
  ...namespaceController,
  ...projectController,
  ...settingsController,
  ...translationController
});
const controllers = {
  controller
};
const middlewares = {};
const apiKeyPolicy = async (policyContext, config2, { strapi: strapi2 }) => {
  const token = policyContext.request.header["authorization"]?.replace("Bearer ", "").trim();
  strapi2.log.info(`[${PLUGIN_ID}] API Key Policy invoked. Token: ${token}`);
  const record = await strapi2.db.query("plugin::strapi-static-strings.setting").findOne({ where: { key: "apiKey" } });
  const expected = record?.value;
  if (!expected) {
    strapi2.log.warn(`[${PLUGIN_ID}] apiKey not set — skipping auth`);
    return true;
  }
  if (token === expected) {
    strapi2.log.info(`[${PLUGIN_ID}] Authorized successfully`);
    return true;
  }
  strapi2.log.warn(`[${PLUGIN_ID}] Invalid API key: ${token}`);
  return policyContext.unauthorized("Invalid API key");
};
const policies = {
  "api-key": apiKeyPolicy
};
const cli = {
  routes: [
    {
      method: "GET",
      path: "/cli/locales",
      handler: "controller.cliFindLocales",
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`]
      }
    },
    {
      method: "GET",
      path: "/cli/projects/:projectId/translations-all",
      handler: "controller.cliGetProjectData",
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`]
      }
    },
    {
      method: "POST",
      path: "/cli/projects/:projectId/namespaces/translations-sync",
      handler: "controller.cliSyncTranslations",
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`]
      }
    },
    {
      method: "PUT",
      path: "/cli/projects/:projectId/namespaces/translations-overwrite",
      handler: "controller.cliSyncTranslationOverwrite",
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`]
      }
    }
  ]
};
const namespace = {
  routes: [
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces",
      handler: "controller.namespaceFindNamespaces",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces/missing-translations",
      handler: "controller.namespaceFindNamespacesWithMissingTranslations",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces/all",
      handler: "controller.namespaceFindNamespacesAll",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces/:namespaceId",
      handler: "controller.namespaceFindNamespaceById",
      config: { auth: false, policies: [] }
    },
    {
      method: "POST",
      path: "/api/projects/:projectId/namespaces",
      handler: "controller.namespaceCreateNamespace",
      config: { auth: false, policies: [] }
    },
    {
      method: "PUT",
      path: "/api/projects/:projectId/namespaces/:namespaceId",
      handler: "controller.namespaceUpdateNamespace",
      config: { auth: false, policies: [] }
    },
    {
      method: "DELETE",
      path: "/api/projects/:projectId/namespaces/:namespaceId",
      handler: "controller.namespaceDeleteNamespace",
      config: { auth: false, policies: [] }
    }
  ]
};
const project = {
  routes: [
    {
      method: "GET",
      path: "/api/projects",
      handler: "controller.projectFindProjects",
      config: { auth: false, policies: [] }
    },
    {
      method: "POST",
      path: "/api/projects",
      handler: "controller.projectCreateProject",
      config: { auth: false, policies: [] }
    },
    {
      method: "PUT",
      path: "/api/projects/:projectId",
      handler: "controller.projectUpdateProject",
      config: { auth: false, policies: [] }
    },
    {
      method: "DELETE",
      path: "/api/projects/:projectId",
      handler: "controller.projectDeleteProject",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/projects/:projectId",
      handler: "controller.projectFindProjectById",
      config: { auth: false, policies: [] }
    }
  ]
};
const setting = {
  routes: [
    {
      method: "GET",
      path: "/api/settings",
      handler: "controller.settingsFind",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/settings/api-key",
      handler: "controller.settingsFindApiKey",
      config: { auth: false, policies: [] }
    },
    {
      method: "POST",
      path: "/api/settings/api-key/regenerate",
      handler: "controller.settingsRegenerateApiKey",
      config: { auth: false, policies: [] }
    }
  ]
};
const translation$1 = {
  routes: [
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces/:namespaceId/translations",
      handler: "controller.translationFindTranslations",
      config: { auth: false, policies: [] }
    },
    {
      method: "GET",
      path: "/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId",
      handler: "controller.translationFindTranslationById",
      config: { auth: false, policies: [] }
    },
    {
      method: "POST",
      path: "/api/projects/:projectId/namespaces/:namespaceId/translations",
      handler: "controller.translationCreateTranslation",
      config: { auth: false, policies: [] }
    },
    {
      method: "PUT",
      path: "/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId",
      handler: "controller.translationUpdateTranslation",
      config: { auth: false, policies: [] }
    },
    {
      method: "DELETE",
      path: "/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId",
      handler: "controller.translationDeleteTranslation",
      config: { auth: false, policies: [] }
    }
  ]
};
const routes = [
  ...cli.routes,
  ...namespace.routes,
  ...project.routes,
  ...setting.routes,
  ...translation$1.routes
];
const uid = `plugin::${PLUGIN_ID}.translation`;
const translation = ({ strapi: strapi2 }) => ({
  async get({ namespace: namespace2, key, page = 1 }) {
    const filters = {};
    const params = {
      fields: ["key", "translations", "namespace"],
      sort: "key:asc",
      limit: 10,
      start: (page - 1) * 10
    };
    if (namespace2) {
      filters["namespace"] = {
        $eqi: namespace2
      };
    }
    if (key) {
      filters["key"] = {
        $containsi: key
      };
    }
    const totalItems = await strapi2.documents(uid).count({ filters });
    const items = await strapi2.documents(uid).findMany({
      ...params,
      filters
    });
    return {
      items,
      pagination: {
        page,
        totalItems,
        totalPages: Math.ceil(totalItems / 10)
      }
    };
  },
  async add(data) {
    return await strapi2.documents(uid).create({ data });
  },
  async update(data) {
    return await strapi2.documents(uid).update({
      documentId: data.documentId,
      data
    });
  },
  async delete(id) {
    return await strapi2.documents(uid).delete({
      documentId: id
    });
  },
  async deleteAll(ctx) {
    const allDocumentIds = await strapi2.documents(uid).findMany({
      fields: ["documentId"]
    }).then((data) => data.map((item) => item.documentId));
    if (allDocumentIds.length === 0) ctx.throw(200, "No translations to delete");
    try {
      for (const allDocumentId of allDocumentIds) {
        await strapi2.documents(uid).delete({
          documentId: allDocumentId
        });
      }
      ctx.send(200, "All translations deleted");
    } catch (e) {
      ctx.throw(500, "Failed to delete all translations");
    }
  },
  async exist(key, namespace2) {
    return await strapi2.documents(uid).count({
      filters: {
        key: {
          $eqi: key
        },
        namespace: {
          $eqi: namespace2
        }
      }
    }).then((count) => count > 0);
  },
  async uploadJson(ctx) {
    const { files } = ctx.request;
    const namespace2 = ctx.request.body.namespace;
    const locale = ctx.request.body.locale;
    if (!files || !files.json) {
      return ctx.throw(400, "No file uploaded");
    }
    const file = files.json;
    if (path__default.default.extname(file.originalFilename) !== ".json") {
      return ctx.throw(400, "Please upload a JSON file");
    }
    const fileContent = fs__default.default.readFileSync(file.filepath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    const keysToUploadOrUpdate = {};
    const failedKeys = [];
    const successKeys = [];
    const updatedKeys = [];
    const allTranslations = await strapi2.documents(uid).findMany({
      fields: ["key", "translations"],
      filters: {
        namespace: {
          $eqi: namespace2
        }
      }
    });
    const canBeAdded = ({ key, value }) => {
      if (typeof key !== "string" || typeof value !== "string") {
        failedKeys.push(key);
        return false;
      }
      const exists = allTranslations.some((translation2) => translation2.key === key);
      if (!exists) return true;
      if (exists && allTranslations.some((translation2) => !translation2.translations[locale]))
        return true;
      failedKeys.push(key);
      return false;
    };
    for (const key in jsonData) {
      if (canBeAdded({
        key,
        value: jsonData[key]
      })) {
        keysToUploadOrUpdate[key] = jsonData[key];
      } else if (typeof jsonData[key] === "object") {
        for (const nestedKey in jsonData[key]) {
          if (canBeAdded({
            key: `${key}.${nestedKey}`,
            value: jsonData[key][nestedKey]
          })) {
            keysToUploadOrUpdate[`${key}.${nestedKey}`] = jsonData[key][nestedKey];
          } else if (typeof jsonData[key][nestedKey] === "object") {
            for (const nestedNestedKey in jsonData[key][nestedKey]) {
              if (canBeAdded({
                key: `${key}.${nestedKey}.${nestedNestedKey}`,
                value: jsonData[key][nestedKey][nestedNestedKey]
              })) {
                keysToUploadOrUpdate[`${key}.${nestedKey}.${nestedNestedKey}`] = jsonData[key][nestedKey][nestedNestedKey];
              }
            }
          }
        }
      }
    }
    if (Object.keys(keysToUploadOrUpdate).length > 0) {
      for (const key in keysToUploadOrUpdate) {
        const existingTranslation = allTranslations.find((translation2) => translation2.key === key);
        if (existingTranslation) {
          await strapi2.documents(uid).update({
            documentId: existingTranslation.documentId,
            translations: {
              ...existingTranslation.translations,
              [locale]: keysToUploadOrUpdate[key]
            }
          });
          updatedKeys.push(key);
        } else {
          await strapi2.documents(uid).create({
            data: {
              key,
              namespace: namespace2,
              translations: {
                [locale]: keysToUploadOrUpdate[key]
              }
            }
          });
        }
        successKeys.push(key);
      }
    }
    return {
      message: "JSON upload summary",
      locale,
      namespace: namespace2,
      failedKeys,
      successKeys,
      updatedKeys
    };
  },
  async exportJson(ctx) {
    const namespaces = await strapi2.plugin(PLUGIN_ID).config("namespaces");
    if (!namespaces || namespaces.length === 0) {
      ctx.throw(400, "No namespaces found");
    }
    ctx.set("Content-Disposition", "attachment; filename=files.zip");
    ctx.set("Content-Type", "application/zip");
    const locales = [
      { code: "en", name: "English (en)" },
      { code: "hr", name: "Croatian (hr)" }
    ];
    const translations = await strapi2.documents(uid).findMany({
      fields: ["key", "translations", "namespace"]
    });
    const jsonToDownload = {};
    locales.forEach((locale) => {
      namespaces.forEach((namespace2) => {
        const data = translations.filter(
          (translation2) => translation2.namespace === namespace2.value
        );
        data.forEach((translation2) => {
          if (!jsonToDownload[`${locale.code}.${namespace2.value}`]) {
            jsonToDownload[`${locale.code}.${namespace2.value}`] = {};
          }
          jsonToDownload[`${locale.code}.${namespace2.value}`][translation2.key] = translation2.translations[locale.code] || "";
        });
      });
    });
    return jsonToDownload;
  }
});
const services = {
  translation
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
module.exports = index;
