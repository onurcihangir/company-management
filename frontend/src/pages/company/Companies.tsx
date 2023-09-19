import React, { useEffect, useState } from "react";
// import qs from "qs";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type {
  FilterValue,
  Key,
  SortOrder,
  SorterResult,
} from "antd/es/table/interface";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import CompanyDeleteModal from "./CompanyDeleteModal";
import { Company, CompanyRequestResponse } from "./Companies.types";
import CompanyCreateModal from "./CompanyCreateModal";
import CompanyEditModal from "./CompanyEditModal";

interface TableParams {
  pagination?: TablePaginationConfig;
  field?: Key | readonly Key[] | undefined;
  order?: SortOrder | undefined;
  filters?: Record<string, FilterValue | null>;
}

const Companies: React.FC = () => {
  const columns: ColumnsType<Company> = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   width: "10%",
    // },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      sorter: true,
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      width: "20%",
      sorter: true,
    },
    {
      title: "Incorporation Country",
      dataIndex: "incorporationCountry",
      width: "20%",
      sorter: true,
    },
    {
      title: "Website",
      dataIndex: "website",
      width: "20%",
      sorter: true,
    },
    {
      title: "Actions",
      width: "20%",
      render: (company) => {
        return (
          <>
            <Button
              shape="round"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(company)}
            >
              Edit
            </Button>
            <Button
              shape="round"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteModal(company)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    _id: "",
    name: "",
    legalNumber: 0,
    incorporationCountry: "",
    website: "",
  });

  const [update, setUpdate] = React.useState(false);
  const [tableData, setTableData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const showDeleteModal = (company: Company) => {
    setOpenDelete(true);
    setSelectedCompany(company);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleEdit = (company: Company) => {
    setOpenEdit(true);
    setSelectedCompany(company);
  };

  const reload = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get<CompanyRequestResponse>(
        `http://localhost:8000/api/companies`,
        {
          params: {
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            sortBy: tableParams.field,
            sortOrder: tableParams.order,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (data) {
        setTableData(data.companies);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.total,
          },
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [
    update,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.field,
    tableParams.order,
  ]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Company> | SorterResult<Company>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div>
      {contextHolder}
      <CompanyDeleteModal
        company={selectedCompany}
        open={openDelete}
        setOpen={setOpenDelete}
        reload={reload}
        messageApi={messageApi}
      />
      <CompanyCreateModal
        open={openAdd}
        setOpen={setOpenAdd}
        reload={reload}
        messageApi={messageApi}
      />
      <CompanyEditModal
        company={selectedCompany}
        open={openEdit}
        setOpen={setOpenEdit}
        reload={reload}
        messageApi={messageApi}
      />
      <Button
        onClick={() => handleAdd()}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        <PlusCircleOutlined />
        Create Company
      </Button>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={tableData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1000, y: 400 }}
      />
    </div>
  );
};

export default Companies;
