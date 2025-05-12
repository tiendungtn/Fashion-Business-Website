import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
  WrapperImageStyle,
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
          <StarFilled style={{ color: "yellow", fontSize: "12px" }} />
        </span>

        <span> | Đã bán 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        100.000đ <WrapperDiscountText>-10%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
