import { IConfirmModalUseHookProps } from './types';
export declare const useHook: ({ onCancel, onConfirm, ref }: IConfirmModalUseHookProps) => {
    isOpen: boolean;
    isLoadingConfirm: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleConfirm: () => Promise<void>;
};
