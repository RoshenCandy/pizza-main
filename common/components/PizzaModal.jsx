import React from 'react';
import { Modal } from 'antd';

const PizzaModal = ({ open, close, children }) => {
  return (
    <Modal open={open} onCancel={close} footer={null} className="modal">
      {children}
    </Modal>
  );
};

export default PizzaModal;
