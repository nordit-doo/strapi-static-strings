export declare const getProjectTranslations: ({ page, projectId, showMissingOnly, search, }: {
    page: number;
    projectId: number;
    showMissingOnly: boolean;
    search?: string;
}) => Promise<any>;
export declare const deleteTranslation: ({ projectId, translationId, }: {
    projectId: number;
    translationId: number;
}) => Promise<any>;
