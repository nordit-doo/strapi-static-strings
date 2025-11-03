/// <reference types="koa" />
declare const _default: {
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
export default _default;
