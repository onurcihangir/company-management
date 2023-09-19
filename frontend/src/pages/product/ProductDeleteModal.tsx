import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Product } from "./Products.types";
import { MessageInstance } from "antd/es/message/interface";

const ProductDeleteModal: React.FC<{
  product: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ product, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const resp = await axios.delete(
        `http://localhost:8000/api/products/${product._id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      messageApi.open({
        type: "success",
        content: resp.data.message,
      });

      setOpen(false);
      reload();
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
    setConfirmLoading(false);
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
        <p>
          Are you sure you want to delete the product named{" "}
          {<b>{product.name}</b>}?
        </p>
      </Modal>
    </>
  );
};

export default ProductDeleteModal;
