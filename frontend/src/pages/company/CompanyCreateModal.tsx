import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Input, Modal } from "antd";
import { Company } from "./Companies.types";
import { MessageInstance } from "antd/es/message/interface";

const CompanyCreateModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  messageApi: MessageInstance;
}> = ({ open, setOpen, reload, messageApi }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newCompany, setNewCompany] = useState<Company>({
    _id: 0,
    name: "",
    legalNumber: 0,
    incorporationCountry: "",
    website: "",
  });

  const handleOk = async () => {
    setConfirmLoading(true);
    const resp = await axios.post(
      `http://localhost:8000/api/companies/`,
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
    setNewCompany({
      _id: 0,
      name: "",
      legalNumber: 0,
      incorporationCountry: "",
      website: "",
    });
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

export default CompanyCreateModal;
