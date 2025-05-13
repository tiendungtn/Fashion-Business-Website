import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
  WrapperImageStyle,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logomall from "../../assets/images/logomall.png";
import logoyeuthich from "../../assets/images/logoyeuthich.png";

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200, padding: "1px", width: "200px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <WrapperImageStyle src={logomall} alt="logomall" />
      <StyleNameProduct>Tên sản phẩm</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>5.00 </span>
          <StarFilled
            style={{ color: "rgb(253, 216, 54)", fontSize: "12px" }}
          />
        </span>

        <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>100.000đ</span>{" "}
        <WrapperDiscountText>-10%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
