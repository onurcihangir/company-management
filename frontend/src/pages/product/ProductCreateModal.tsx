import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Input, Modal, Select } from "antd";
import { Product } from "./Products.types";
import { Company } from "../company/Companies.types";
import { MessageInstance } from "antd/es/message/interface";

const ProductCreateModal: React.FC<{
  companies: { label: string; value: string }[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ companies, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: 0,
    name: "",
    amount: 0,
    amountUnit: "",
    category: "",
    company: {
      id: 0,
      name: "",
    },
  });

  const handleOk = async () => {
    setConfirmLoading(true);
    console.log(newProduct);
    const resp = await axios.post(
      `http://localhost:8000/api/products/`,
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
    setNewProduct({
      _id: 0,
      name: "",
      amount: 0,
      amountUnit: "",
      category: "",
      company: {
        id: 0,
        name: "",
      },
    });
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
        title="Create Product"
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
          placeholder="Category"
          value={newProduct?.category}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              category: event.target.value,
            })
          }
        />
        <Input
          placeholder="Amount"
          value={newProduct?.amount}
          onChange={(event) =>
            setNewProduct({
              ...newProduct,
              amount: Number(event.target.value),
            })
          }
        />
        <Input
          placeholder="Amount Unit"
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

export default ProductCreateModal;
