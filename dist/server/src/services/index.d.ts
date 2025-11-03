declare const _default: {
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
        add(data: import("../../../types/Translation").ITranslation): Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        update(data: import("../../../types/Translation").ITranslation): Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
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
export default _default;
