import { Context } from 'koa';
declare const _default: {
    /*************************************************************************************************
     * TRANSLATION controllers - query
     *************************************************************************************************/
    translationFindTranslations(ctx: Context): Promise<void>;
    translationFindTranslationById(ctx: Context): Promise<void>;
    translationFindTranslationsMissingCountAnyLanguage(ctx: any): Promise<void>;
    translationFindAllProjectTranslations(ctx: Context): Promise<void>;
    /*************************************************************************************************
     * TRANSLATION controllers - mutation
     *************************************************************************************************/
    translationCreateTranslation(ctx: Context): Promise<void>;
    translationUpdateTranslation(ctx: Context): Promise<void>;
    translationDeleteTranslation(ctx: Context): Promise<void>;
};
export default _default;
