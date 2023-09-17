import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Product } from "./Products.types";

const ProductDeleteModal: React.FC<{
  product: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
}> = ({ product, open, setOpen, reload }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.delete(
      `http://localhost:8000/api/products/${product._id}`
    );
    console.log(resp);
    setConfirmLoading(false);
    setOpen(false);
    reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Delete Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete the product named {product.name}?</p>
      </Modal>
    </>
  );
};

export default ProductDeleteModal;
