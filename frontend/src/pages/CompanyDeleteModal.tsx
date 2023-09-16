import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Company } from "./Companies.types";

const CompanyDeleteModal: React.FC<{
  company: Company;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ company, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.delete(
      `http://localhost:8000/api/companies/${company.id}`
    );
    console.log(resp);
    setConfirmLoading(false);
    setOpen(false);
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
        <p>Are you sure you want to delete the company named {company.name}?</p>
      </Modal>
    </>
  );
};

export default CompanyDeleteModal;
