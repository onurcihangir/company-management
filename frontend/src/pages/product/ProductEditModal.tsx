import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import { Input, Modal, Select } from "antd";
import { Product } from "./Products.types";
import { MessageInstance } from "antd/es/message/interface";

const ProductEditModal: React.FC<{
  companies: { label: string; value: string }[];
  product: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ companies, product, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(product);

  useEffect(() => {
    setNewProduct(product);
  }, [product]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.put(
      `http://localhost:8000/api/products/${product._id}`,
      newProduct,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    messageApi.open({
      type: "success",
      content: resp.data.message,
    });
    console.log(resp);
    setConfirmLoading(false);
    handleCancel();
    reload();
  };

  const handleCancel = () => {
    // setNewProduct({
    //   _id: 0,
    //   name: "",
    //   legalNumber: 0,
    //   incorporationCountry: "",
    //   website: "",
    // });
    setOpen(false);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option: { label: string; value: string } | undefined
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Modal
        title="Edit Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Name"
          value={newProduct?.name}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              name: event.target.value,
            })
          }
        />
        <Input
          placeholder="Legal Number"
          value={newProduct?.amount}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              amount: Number(event.target.value),
            })
          }
        />
        <Input
          placeholder="Incorporation Country"
          value={newProduct?.category}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              category: event.target.value,
            })
          }
        />
        <Input
          placeholder="Website"
          value={newProduct?.amountUnit}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              amountUnit: event.target.value,
            })
          }
        />
        <Select
          showSearch
          placeholder="Select a Company"
          optionFilterProp="children"
          onChange={(value) =>
            setNewProduct({
              ...newProduct,
              company: value,
            })
          }
          filterOption={filterOption}
          options={companies}
        />
      </Modal>
    </>
  );
};

export default ProductEditModal;
