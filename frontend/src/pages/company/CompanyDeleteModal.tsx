import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Company } from "./Companies.types";
import { MessageInstance } from "antd/es/message/interface";

const CompanyDeleteModal: React.FC<{
  company: Company;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ company, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.delete(
      `http://localhost:8000/api/companies/${company._id}`,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    console.log(resp);
    messageApi.open({
      type: "success",
      content: resp.data.message,
    });
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
        title="Delete Company"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to delete the company named{" "}
          {<b>{company.name}</b>}?
        </p>
      </Modal>
    </>
  );
};

export default CompanyDeleteModal;
