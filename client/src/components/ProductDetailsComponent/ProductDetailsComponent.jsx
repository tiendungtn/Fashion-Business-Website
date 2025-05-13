import { Col, Image, InputNumber, Row } from "antd";
import React from "react";
import product1 from "../../assets/images/product1.jpeg";
import productsmall1 from "../../assets/images/productsmall1.jpeg";
import productsmall2 from "../../assets/images/productsmall2.jpeg";
import productsmall3 from "../../assets/images/productsmall3.jpeg";
import productsmall4 from "../../assets/images/productsmall4.jpeg";
import productsmall5 from "../../assets/images/productsmall5.jpeg";
import {
  WrapperPriceProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = () => {
  const onChange = () => {};
  return (
    <Row
      style={{ padding: "16px ", backgroundColor: "#fff", borderRadius: "4px" }}
    >
      <Col
        span={10}
        style={{ border: "1px solid #e5e5e5", paddingRight: "10px" }}
      >
        <Image src={product1} alt="image product" preview={false} />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall1}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall2}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall3}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall4}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall5}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={productsmall1}
              alt="image product small"
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "20px" }}>
        <WrapperStyleNameProduct>
          Set MINT 3D T-shirt MINT 3D T-shirt MINT 3D T-shirt
        </WrapperStyleNameProduct>
        <div>
          <StarFilled
            style={{ color: "rgb(253, 216, 54)", fontSize: "12px" }}
          />
          <StarFilled
            style={{ color: "rgb(253, 216, 54)", fontSize: "12px" }}
          />
          <StarFilled
            style={{ color: "rgb(253, 216, 54)", fontSize: "12px" }}
          />
          <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>100.000đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">Quận Cầu Giấy, Hà Nội</span> -
          <span className="change-address"> Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div
          style={{
            margin: "10px 0px 20px",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            padding: "10px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>

            <WrapperInputNumber
              defaultValue={1}
              onChange={onChange}
              size="small"
            />
            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <ButtonComponent
            size={40}
            styleButton={{
              backgroundColor: "rgb(255, 57, 69)",
              height: "48px",
              width: "220px",
              border: "none",
              borderRadius: "4px",
            }}
            textButton={"Mua ngay"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
            }}
          ></ButtonComponent>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              backgroundColor: "#fff",
              height: "48px",
              width: "220px",
              border: "1px solid rgb(13, 92, 182)",
              borderRadius: "4px",
            }}
            textButton={"Mua trả sau"}
            styleTextButton={{ color: "rgb(13, 92, 182", fontSize: "15px" }}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
