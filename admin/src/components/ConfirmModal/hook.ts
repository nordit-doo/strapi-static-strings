import { useImperativeHandle, useState } from 'react';
import { IConfirmModalUseHookProps } from './types';

export const useHook = ({ onCancel, onConfirm, ref }: IConfirmModalUseHookProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = async () => {
    setIsLoadingConfirm(true);
    const res = await onConfirm();
    setIsLoadingConfirm(false);
    if (res) {
      setIsOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
  }));

  return {
    isOpen,
    isLoadingConfirm,
    handleOpen,
    handleClose,
    handleConfirm,
  };
};
