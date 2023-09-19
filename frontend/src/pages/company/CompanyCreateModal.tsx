import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Form, Input, Modal } from "antd";
import { MessageInstance } from "antd/es/message/interface";

const CompanyCreateModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        try {
          const resp = await axios.post(
            `http://localhost:8000/api/companies/`,
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

  return (
    <>
      <Modal
        title="Create Company"
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
            name="legalNumber"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Legal Number"
              addonBefore={
                <div style={{ width: "102.29px" }}>Legal Number</div>
              }
            />
          </Form.Item>
          <Form.Item
            name="incorporationCountry"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Incorporation Country"
              addonBefore={
                <div
                  style={{
                    width: "102.29px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Incorporation Country
                </div>
              }
            />
          </Form.Item>
          <Form.Item
            name="website"
            rules={[{ required: true, message: "Can not be left blank!" }]}
          >
            <Input
              placeholder="Website"
              addonBefore={<div style={{ width: "102.29px" }}>Website</div>}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CompanyCreateModal;
