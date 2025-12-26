/// <reference types="react" />
import { IPagination } from '../../../../types/Common';
import { INamespace } from '../../../../types/Namespace';
import { IConfirmModalRef } from 'src/components/ConfirmModal/types';
export declare const useHook: () => {
    confirmDeleteModalRef: import("react").MutableRefObject<IConfirmModalRef<unknown> | null>;
    handleDeleteConfirm: () => Promise<boolean>;
    handleEditNamespace: (namespace: INamespace) => () => void;
    handleNamespaceCreate: () => void;
    handlePagePress: (page: number) => void;
    handleRefetch: ({ page, search }?: {
        page?: number;
        search?: string;
    }) => Promise<void>;
    handleSearchChange: (value: string) => void;
    handleToggleDeleteNamespace: (namespace?: INamespace) => () => Promise<void>;
    isPending: boolean;
    namespaces: {
        items: INamespace[];
        pagination: IPagination;
    } | null;
    namespaceCreatedEditModalRef: import("react").MutableRefObject<{
        open: (data?: INamespace) => void;
    } | null>;
    projectId: string | undefined;
    searchQuery: string;
    selectedDeleteNamespace: INamespace | null;
};
