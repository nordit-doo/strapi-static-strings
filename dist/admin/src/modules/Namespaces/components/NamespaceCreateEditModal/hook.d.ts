import { INamespace } from '../../../../../../types/Namespace';
export declare const useHook: ({ projectId, ref, refetch }: any) => {
    currentNamespace: INamespace | null;
    description: string;
    handleClose: () => void;
    handleDelete: () => Promise<void>;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenChange: (open: boolean) => void;
    handleSave: () => Promise<void>;
    isLoadingDelete: boolean;
    isLoadingSave: boolean;
    isOpen: boolean;
    name: string;
};
