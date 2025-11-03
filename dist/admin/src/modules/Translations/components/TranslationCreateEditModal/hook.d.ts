import { ITranslation } from '../../../../../../types/Translation';
export declare const useHook: ({ namespaceId, projectId, ref, refetch }: any) => {
    currentTranslation: ITranslation | null;
    handleClose: () => void;
    handleDelete: () => Promise<void>;
    handleKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNamespaceChange: (value: string | number) => void;
    handleTranslationsChange: (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleOpenChange: (open: boolean) => void;
    handleSave: () => Promise<void>;
    isLoadingDelete: boolean;
    isLoadingSave: boolean;
    isOpen: boolean;
    key: string;
    locales: import("../../../../../../types/Locale").ILocale[];
    namespaces: import("../../../../../../types/Namespace").INamespace[];
    translations: {
        [key: string]: string;
    };
    selectedNamespaceId: any;
};
