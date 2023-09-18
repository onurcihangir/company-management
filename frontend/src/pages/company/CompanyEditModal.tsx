import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import { Input, Modal } from "antd";
import { Company } from "./Companies.types";
import { MessageInstance } from "antd/es/message/interface";

const CompanyEditModal: React.FC<{
  company: Company;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ company, open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newCompany, setNewCompany] = useState<Company>(company);

  useEffect(() => {
    setNewCompany(company);
  }, [company]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.put(
      `http://localhost:8000/api/companies/${company._id}`,
      newCompany,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    console.log(resp);
    messageApi.open({
      type: "success",
      content: resp.data.message,
    });
    setConfirmLoading(false);
    handleCancel();
    reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit Company"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Name"
          addonBefore={<div style={{ width: "102.29px" }}>Name</div>}
          value={newCompany?.name}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              name: event.target.value,
            })
          }
        />
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Legal Number"
          addonBefore={<div style={{ width: "102.29px" }}>Legal Number</div>}
          value={newCompany?.legalNumber}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              legalNumber: Number(event.target.value),
            })
          }
        />
        <Input
          style={{ marginBottom: 10 }}
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
          value={newCompany?.incorporationCountry}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              incorporationCountry: event.target.value,
            })
          }
        />
        <Input
          placeholder="Website"
          addonBefore={<div style={{ width: "102.29px" }}>Website</div>}
          value={newCompany?.website}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              website: event.target.value,
            })
          }
        />
      </Modal>
    </>
  );
};

export default CompanyEditModal;
