/// <reference types="react" />
import { IPagination } from '../../../../types/Common';
import { IProject } from '../../../../types/Project';
import { IConfirmModalRef } from 'src/components/ConfirmModal/types';
export declare const useHook: () => {
    confirmDeleteModalRef: import("react").MutableRefObject<IConfirmModalRef<unknown> | null>;
    handleClipboardCopy: (project: IProject) => (e: React.MouseEvent) => void;
    handleDeleteConfirm: () => Promise<boolean>;
    handleEdit: (project: IProject) => (e: React.MouseEvent) => void;
    handleProjectCreate: () => void;
    handleRefetch: () => Promise<void>;
    handleToggleDelete: (project?: IProject) => (e: React.MouseEvent) => Promise<void>;
    isPending: boolean;
    projectCreatedEditModalRef: import("react").MutableRefObject<{
        open: (data?: IProject) => void;
    } | null>;
    projects: {
        items: IProject[];
        pagination: IPagination;
    } | null;
    selectedDeleteProject: IProject | null;
};
