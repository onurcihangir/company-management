import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { BankOutlined, ProjectOutlined } from "@ant-design/icons";
import axios from "axios";
import { Company } from "./company/Companies.types";
import { Product } from "./product/Products.types";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
      if (data) {
        setProducts(data);
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
          <Card bordered loading={loading}>
            <Statistic
              // style={{
              //   width: 100,
              // }}
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
          <Card bordered loading={loading}>
            <Statistic
              // style={{
              //   width: 100,
              // }}
              title="Total Products"
              value={products.length}
              valueStyle={{
                color: "#001529",
              }}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
