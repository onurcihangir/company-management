import React, { useEffect, useState } from "react";
// import qs from "qs";
import { Button, Table, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import { Product } from "./Products.types";
import ProductEditModal from "./ProductEditModal";
import ProductCreateModal from "./ProductCreateModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { Company } from "../company/Companies.types";

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

const Products: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [update, setUpdate] = React.useState(false);
  const [tableData, setTableData] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 200,
    },
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    _id: 0,
    name: "",
    amount: 0,
    amountUnit: "",
    category: "",
    company: {
      id: 0,
      name: "",
    },
  });
  const [companies, setCompanies] = useState<
    { label: string; value: string }[]
  >([]);

  const columns: ColumnsType<Product> = [
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
    {
      title: "actions",
      width: "20%",
      render: (product) => {
        return (
          <>
            <Button
              shape="round"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(product)}
            >
              Edit
            </Button>
            <Button
              shape="round"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteModal(product)}
            >
              Delete
            </Button>
            {/* <EditOutlined onClick={() => handleEdit(product)} />
            <DeleteOutlined onClick={() => showDeleteModal(product)} /> */}
          </>
        );
      },
    },
  ];

  const showDeleteModal = (product: Product) => {
    console.log(product);
    setOpenDelete(true);
    setSelectedProduct(product);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleEdit = (product: Product) => {
    setOpenEdit(true);
    setSelectedProduct(product);
  };

  const reload = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const { data } = await axios.get<Company[]>(
        `http://localhost:8000/api/companies`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let company: any = {};
          company["value"] = data[i]._id;
          company["label"] = data[i].name;
          arr.push(company);
        }
        setCompanies(arr);
      }
      setLoading(false);
    };
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get<Product[]>(
        `http://localhost:8000/api/products`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (data) {
        setTableData(data);
      }
      setLoading(false);
      // setTableParams({
      //   ...tableParams,
      //   pagination: {
      //     ...tableParams.pagination,
      //     total: 200,
      //     // 200 is mock data, you should read it from server
      //     // total: data.totalCount,
      //   },
      // });
    };
    fetchData();
    fetchCompanies();
  }, [update, tableParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    console.log(tableParams);
    console.log(pagination, filters, sorter);

    // // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setTableData([]);
    // }
  };

  return (
    <div>
      {contextHolder}
      <ProductDeleteModal
        product={selectedProduct}
        open={openDelete}
        setOpen={setOpenDelete}
        reload={reload}
        messageApi={messageApi}
      />
      <ProductCreateModal
        companies={companies}
        open={openAdd}
        setOpen={setOpenAdd}
        reload={reload}
        messageApi={messageApi}
      />
      <ProductEditModal
        companies={companies}
        product={selectedProduct}
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
        Create Product
      </Button>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={tableData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1000, y: 500 }}
      />
    </div>
  );
};

export default Products;
