/// <reference types="react" />
export interface IConfirmModalProps {
    onCancel?: () => void;
    onConfirm: () => Promise<boolean>;
    text: string;
    title: string;
}
export interface IConfirmModalRef<T> {
    open: (data: T) => void;
}
export interface IConfirmModalUseHookProps extends Pick<IConfirmModalProps, 'onCancel' | 'onConfirm'> {
    ref: React.Ref<IConfirmModalRef<unknown>>;
}
