import { Card } from "antd";
import styled from "styled-components";
export const WrapperCardStyle = styled(Card)`
  width: 200px;
  & img {
    height: 200px;
    width: 200px;
  }
  padding: 1px;
  position: relative;
`;
export const WrapperImageStyle = styled.img`
  width: 28px !important;
  height: 14px !important;
  top: 0 !important;
  left: 0 !important;
  position: absolute !important;
`;

export const StyleNameProduct = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgb(56, 56, 61);
  line-height: 16px;
`;
export const WrapperReportText = styled.div`
  font-size: 11px;
  display: flex;
  color: rgb(128, 128, 137);
  align-items: center;
  margin: 6px 0 0px;
`;
export const WrapperPriceText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgb(255, 66, 78);
`;
export const WrapperDiscountText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgb(255, 66, 78);
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
