export interface ITranslationBase {
    id: number;
    documentId?: string | null;
    key: string;
    namespace: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
}
/**
 * Database representation (flat structure with language columns)
 */
export type ITranslation = ITranslationBase & Record<string, string | number | null>;
/**
 * API payload representation (when creating/updating)
 */
export interface ITranslationPayload {
    key: string;
    namespaceId: number;
    projectId: number;
    translations: Record<string, string>;
    id?: number;
}
