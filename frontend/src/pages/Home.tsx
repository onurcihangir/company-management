import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table, Typography } from "antd";
import { BankOutlined, ProjectOutlined } from "@ant-design/icons";
import axios from "axios";
import { Company } from "./company/Companies.types";
import { Product } from "./product/Products.types";
import { ColumnsType } from "antd/es/table";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [lastAddedCompanies, setLastAddedCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const columns: ColumnsType<Company> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      width: "25%",
    },
    {
      title: "Incorporation Country",
      dataIndex: "incorporationCountry",
      width: "25%",
    },
    {
      title: "Website",
      dataIndex: "website",
      width: "25%",
    },
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const { data } = await axios.get<Company[]>(
        `http://localhost:8000/api/companies/getList`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (data) {
        setCompanies(data);
        // if there are more than 3 companies
        if (data.length > 3) {
          // get last 3 companies
          setLastAddedCompanies(data.slice(-3));
        } else {
          // else get all companies
          setLastAddedCompanies(data);
        }
      }
      setLoading(false);
    };

    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await axios.get<Product[]>(
        `http://localhost:8000/api/products/getList`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      let arr:Product[] = []
      if (arr) {
        setProducts(arr);
      }
      setLoading(false);
    };

    fetchProducts();
    fetchCompanies();
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card
            bordered
            loading={loading}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            <Statistic
              title="Total Companies"
              value={companies.length}
              valueStyle={{
                color: "#001529",
              }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered
            loading={loading}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            <Statistic
              title="Total Products"
              value={products.length}
              valueStyle={{
                color: "#001529",
              }}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col
          span={24}
          style={{
            padding: 10,
          }}
        >
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography.Title level={4}>
                  Last Added Companies
                </Typography.Title>
              </div>
            }
            bordered
            loading={loading}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            <Table
              pagination={false}
              dataSource={lastAddedCompanies}
              columns={columns}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
