/// <reference types="react" />
import { IPagination } from '../../../../types/Common';
import { ITranslation } from '../../../../types/Translation';
export declare const useHook: () => {
    confirmDeleteModalRef: import("react").MutableRefObject<{
        open: (data?: unknown) => void;
    } | null>;
    handleDeleteConfirm: () => Promise<boolean>;
    handleEditTranslation: (translation: ITranslation) => () => void;
    handlePagePress: (page: number) => void;
    handleRefetch: ({ page, showMissingOnly, search, }?: {
        page?: number;
        showMissingOnly: boolean;
        search?: string;
    }) => Promise<void>;
    handleSearchChange: (value: string) => void;
    handleShowMissingTranslationsOnlyChange: (value: boolean) => void;
    handleToggleDeleteTranslation: (translation?: ITranslation) => () => Promise<void>;
    handleTranslationCreate: () => void;
    isPending: boolean;
    searchQuery: string;
    translations: {
        items: ITranslation[];
        pagination: IPagination;
    } | null;
    projectId: number;
    selectedDeleteTranslation: ITranslation | null;
    showMissingTranslationsOnly: boolean;
    translationCreatedEditModalRef: import("react").MutableRefObject<{
        open: (data?: ITranslation) => void;
    } | null>;
};
