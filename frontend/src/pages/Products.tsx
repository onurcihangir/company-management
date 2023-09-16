import React, { useEffect, useState } from "react";
// import qs from "qs";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";

interface DataType {
  id: number;
  name: string;
  category: string;
  amount: number;
  amountUnit: string;
  company: {
    id: number;
    name: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    width: "20%",
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
  },
  {
    title: "Category",
    dataIndex: "category",
    width: "20%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "20%",
  },
  {
    title: "Amount Unit",
    dataIndex: "amountUnit",
    width: "20%",
  },
  {
    title: "Company",
    dataIndex: "company",
    width: "20%",
    render: (company) => company.name,
  },
];

// const getRandomuserParams = (params: TableParams) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

const Products: React.FC = () => {
  const [tableData, setTableData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get<DataType[]>(
        `http://localhost:8000/api/products`
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
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
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
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={tableData}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: 1000, y: 500 }}
    />
  );
};

export default Products;
