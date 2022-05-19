import React from 'react';

export type ModalPropsType = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};
