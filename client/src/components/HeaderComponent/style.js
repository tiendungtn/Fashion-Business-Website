import { Row } from "antd";
import { styled } from "styled-components";


export const WrapperHeader = styled(Row)`
    background-color: rgb(26, 148, 255);
    padding: 10px 120px;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`
export const WrapperTextHeader = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`
