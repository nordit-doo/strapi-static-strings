/// <reference types="react" />
import { IPagination } from '../../../../types/Common';
import { IProject } from '../../../../types/Project';
export declare const useHook: () => {
    handleClipboardCopy: (project: IProject) => (e: React.MouseEvent) => void;
    handleDelete: (project: IProject) => (e: React.MouseEvent) => void;
    handleEdit: (project: IProject) => (e: React.MouseEvent) => void;
    handleProjectCreate: () => void;
    handleRefetch: () => Promise<void>;
    isPending: boolean;
    projectCreatedEditModalRef: import("react").MutableRefObject<{
        open: (data?: IProject) => void;
    } | null>;
    projects: {
        items: IProject[];
        pagination: IPagination;
    } | null;
};
