export declare const getNamespaces: ({ page, projectId, search, }: {
    page: number;
    projectId: string;
    search?: string;
}) => Promise<any>;
export declare const deleteNamespace: ({ namespaceId, projectId, }: {
    namespaceId: number;
    projectId: number;
}) => Promise<any>;
