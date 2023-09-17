import React, { useEffect, useState } from "react";
// import qs from "qs";
import { Button, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import CompanyDeleteModal from "./CompanyDeleteModal";
import { Company } from "./Companies.types";
import CompanyCreateModal from "./CompanyCreateModal";
import CompanyEditModal from "./CompanyEditModal";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

// const getRandomuserParams = (params: TableParams) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

const Companies: React.FC = () => {
  const columns: ColumnsType<Company> = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      width: "10%",
    },
    {
      title: "Incorporation Country",
      dataIndex: "incorporationCountry",
      width: "20%",
    },
    {
      title: "Website",
      dataIndex: "website",
      width: "20%",
    },
    {
      title: "actions",
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
            {/* <EditOutlined onClick={() => handleEdit(company)} /> */}
            {/* <DeleteOutlined onClick={() => showDeleteModal(company)} /> */}
          </>
        );
      },
    },
  ];
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    _id: 0,
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
    console.log(company);
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
      const { data } = await axios.get<Company[]>(
        `http://localhost:8000/api/companies`
      );
      if (data) {
        setTableData(data);
      }
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    };
    fetchData();
  }, [update]);

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

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setTableData([]);
    }
  };

  return (
    <div>
      <CompanyDeleteModal
        company={selectedCompany}
        open={openDelete}
        setOpen={setOpenDelete}
        reload={reload}
      />
      <CompanyCreateModal open={openAdd} setOpen={setOpenAdd} reload={reload} />
      <CompanyEditModal
        company={selectedCompany}
        open={openEdit}
        setOpen={setOpenEdit}
        reload={reload}
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
        scroll={{ x: "max-content", y: 500 }} // y: 500
      />
    </div>
  );
};

export default Companies;
