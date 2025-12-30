declare const _default: {
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
            pluginOptions: {
                "content-manager": {
                    visible: boolean;
                };
                "content-type-builder": {
                    visible: boolean;
                };
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
            pluginOptions: {
                "content-manager": {
                    visible: boolean;
                };
                "content-type-builder": {
                    visible: boolean;
                };
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
            pluginOptions: {
                "content-manager": {
                    visible: boolean;
                };
                "content-type-builder": {
                    visible: boolean;
                };
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
export default _default;
