/// <reference types="koa" />
declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: any;
    }) => Promise<void>;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        controller: () => {
            translationFindTranslations(ctx: import("koa").Context): Promise<void>;
            translationFindTranslationById(ctx: import("koa").Context): Promise<void>;
            translationFindTranslationsMissingCountAnyLanguage(ctx: any): Promise<void>;
            translationCreateTranslation(ctx: import("koa").Context): Promise<void>;
            translationUpdateTranslation(ctx: import("koa").Context): Promise<void>;
            translationDeleteTranslation(ctx: import("koa").Context): Promise<void>;
            settingsFind(ctx: any): Promise<void>;
            settingsFindApiKey(ctx: any): Promise<void>;
            settingsRegenerateApiKey(ctx: any): Promise<void>;
            projectFindProjects(ctx: any): Promise<void>;
            projectFindProjectById(ctx: any): Promise<void>;
            projectCreateProject(ctx: any): Promise<void>;
            projectUpdateProject(ctx: any): Promise<void>;
            projectDeleteProject(ctx: any): Promise<void>;
            namespaceFindNamespaces(ctx: import("koa").Context): Promise<void>;
            namespaceFindNamespacesAll(ctx: import("koa").Context): Promise<void>;
            namespaceFindNamespaceById(ctx: import("koa").Context): Promise<void>;
            namespaceFindNamespacesWithMissingTranslations(ctx: import("koa").Context): Promise<void>;
            namespaceCreateNamespace(ctx: import("koa").Context): Promise<void>;
            namespaceUpdateNamespace(ctx: import("koa").Context): Promise<void>;
            namespaceDeleteNamespace(ctx: import("koa").Context): Promise<void>;
            cliFindLocales(ctx: any): Promise<void>;
            cliGetProjectData(ctx: any): Promise<any>;
            cliSyncTranslations(ctx: any): Promise<any>;
            cliSyncTranslationOverwrite(ctx: any): Promise<any>;
        };
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            auth: boolean;
            policies: any[];
        };
    }[];
    services: {
        translation: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            get({ namespace, key, page }: {
                namespace: any;
                key: any;
                page?: number;
            }): Promise<{
                items: import("@strapi/types/dist/modules/documents").AnyDocument[];
                pagination: {
                    page: number;
                    totalItems: number;
                    totalPages: number;
                };
            }>;
            add(data: import("../../types/Translation").ITranslation): Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
            update(data: import("../../types/Translation").ITranslation): Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
            delete(id: string): Promise<{
                documentId: string;
                entries: import("@strapi/types/dist/modules/documents").AnyDocument[];
            }>;
            deleteAll(ctx: any): Promise<void>;
            exist(key: string, namespace: string): Promise<boolean>;
            uploadJson(ctx: any): Promise<any>;
            exportJson(ctx: any): Promise<{}>;
        };
    };
    contentTypes: {
        namespace: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                attributes: {
                    description: {
                        type: string;
                        required: boolean;
                    };
                    name: {
                        type: string;
                        required: boolean;
                    };
                    project: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                    translations: {
                        type: string;
                        relation: string;
                        target: string;
                        mappedBy: string;
                    };
                };
            };
        };
        project: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                attributes: {
                    description: {
                        type: string;
                        required: boolean;
                        unique: boolean;
                    };
                    name: {
                        type: string;
                        required: boolean;
                        unique: boolean;
                    };
                    namespaces: {
                        type: string;
                        relation: string;
                        target: string;
                        mappedBy: string;
                    };
                };
            };
        };
        setting: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                attributes: {
                    key: {
                        type: string;
                        unique: boolean;
                        required: boolean;
                    };
                    value: {
                        type: string;
                        required: boolean;
                    };
                };
            };
        };
        translation: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    name: string;
                    displayName: string;
                    singularName: string;
                    pluralName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    en: {
                        type: string;
                    };
                    key: {
                        type: string;
                        required: boolean;
                    };
                    translations: {
                        type: string;
                        required: boolean;
                    };
                    namespace: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                };
            };
        };
    };
    policies: {
        'api-key': (policyContext: any, config: any, { strapi }: {
            strapi: any;
        }) => Promise<any>;
    };
    middlewares: {};
};
export default _default;
