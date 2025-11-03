import { ITranslationPayload } from '../../../../types/Translation';
export declare const getTranslation: ({ namespaceId, page, projectId, showMissingOnly, }: {
    namespaceId: number;
    page: number;
    projectId: number;
    showMissingOnly: boolean;
}) => Promise<any>;
export declare const createTranslation: ({ projectId, namespaceId, key, translations, }: ITranslationPayload) => Promise<any>;
export declare const updateTranslation: ({ projectId, namespaceId, id, key, translations, }: ITranslationPayload) => Promise<any>;
export declare const deleteTranslation: ({ namespaceId, projectId, translationId, }: {
    namespaceId: number;
    projectId: number;
    translationId: number;
}) => Promise<any>;
