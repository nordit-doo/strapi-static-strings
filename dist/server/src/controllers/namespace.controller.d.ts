import type { Context } from 'koa';
declare const _default: {
    /*************************************************************************************************
     * NAMESPACE controllers - query
     *************************************************************************************************/
    namespaceFindNamespaces(ctx: Context): Promise<void>;
    namespaceFindNamespacesAll(ctx: Context): Promise<void>;
    namespaceFindNamespaceById(ctx: Context): Promise<void>;
    namespaceFindNamespacesWithMissingTranslations(ctx: Context): Promise<void>;
    /*************************************************************************************************
     * NAMESPACE controllers - mutation
     *************************************************************************************************/
    namespaceCreateNamespace(ctx: Context): Promise<void>;
    namespaceUpdateNamespace(ctx: Context): Promise<void>;
    namespaceDeleteNamespace(ctx: Context): Promise<void>;
};
export default _default;
