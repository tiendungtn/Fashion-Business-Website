import { Col } from "antd";
import React from "react";
import { WrapperHeader, WrapperTextHeader } from "./style";
import Search from "antd/es/transfer/search";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>MINT</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tìm kiếm"
            /* onSearch={onSearch}  */
            enterButton
          />
        </Col>
        <Col span={6}>
          <div>
            <UserOutlined />
            <div>
              <span>Đăng nhập/Đăng ký</span>
              <div>
                <span>Tài khoản</span>
                <CaretDownOutlined />
              </div>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
