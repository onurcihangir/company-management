import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Input, Modal } from "antd";
import { Company } from "./Companies.types";

const CompanyCreateModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
}> = ({ open, setOpen, reload }) => {
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
      newCompany
    );
    console.log(resp);
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
          placeholder="Name"
          value={newCompany?.name}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              name: event.target.value,
            })
          }
        />
        <Input
          placeholder="Legal Number"
          value={newCompany?.legalNumber}
          onChange={(event) =>
            setNewCompany({
              ...newCompany,
              legalNumber: Number(event.target.value),
            })
          }
        />
        <Input
          placeholder="Incorporation Country"
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
