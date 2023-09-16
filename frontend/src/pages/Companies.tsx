import React, { useEffect, useState } from "react";
// import qs from "qs";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CompanyDeleteModal from "./CompanyDeleteModal";
import { Company } from "./Companies.types";

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
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      width: "20%",
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
            <EditOutlined />
            <DeleteOutlined onClick={() => showDeleteModal(company)} />
          </>
        );
      },
    },
  ];
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    id: 0,
    name: "",
    legalNumber: 0,
    incorporationCountry: "",
    website: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get<Company[]>(
        `http://localhost:8000/api/companies`
      );
      console.log(data);
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
  }, []);

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
    <>
      <CompanyDeleteModal
        company={selectedCompany}
        open={openDelete}
        setOpen={setOpenDelete}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={tableData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1000, y: 500 }}
      />
    </>
  );
};

export default Companies;
