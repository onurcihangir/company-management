import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Form, Input, Modal, Select } from "antd";
import { MessageInstance } from "antd/es/message/interface";

const ProductCreateModal: React.FC<{
  companies: { label: string; value: string }[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ companies, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        try {
          const resp = await axios.post(
            `http://localhost:8000/api/products/`,
            values,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          messageApi.open({
            type: "success",
            content: resp.data.message,
          });
          handleCancel();
          reload();
        } catch (error: any) {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
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
        <Form
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Name"
              addonBefore={<div style={{ width: "102.29px" }}>Name</div>}
            />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Category"
              addonBefore={<div style={{ width: "102.29px" }}>Category</div>}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Amount"
              addonBefore={<div style={{ width: "102.29px" }}>Amount</div>}
            />
          </Form.Item>
          <Form.Item
            name="amountUnit"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Amount Unit"
              addonBefore={<div style={{ width: "102.29px" }}>Amount Unit</div>}
            />
          </Form.Item>
          <Form.Item
            name="company"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Select a Company"
              optionFilterProp="children"
              filterOption={filterOption}
              options={companies}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductCreateModal;
