import { IProject } from '../../../../../../types/Project';
export declare const useHook: ({ ref, refetch }: any) => {
    currentProject: IProject | null;
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
