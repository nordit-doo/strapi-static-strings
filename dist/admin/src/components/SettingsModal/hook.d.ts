export declare const useHook: () => {
    apiKey: string | null;
    isOpen: boolean;
    isLoading: boolean;
    handleClose: () => void;
    handleCopy: () => Promise<void>;
    handleOpenChange: (open: boolean) => void;
    handleFetchApiKey: () => Promise<void>;
    handleRegenerate: () => Promise<void>;
};
