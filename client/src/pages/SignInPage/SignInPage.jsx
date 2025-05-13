import React from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextlight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logologin from "../../assets/images/logologin.jpeg";
import { Image } from "antd";
import { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "4px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style={{ marginBottom: "10px" }} placeholder={"Email"} />
          <div style={{ position: "relative" }}>
            <span
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
            />
          </div>
          <ButtonComponent
            size={40}
            styleButton={{
              backgroundColor: "rgb(255, 57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "26px 0 10px",
            }}
            textButton={"Đăng nhập"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
            }}
          ></ButtonComponent>
          <p>
            <WrapperTextlight>Quên mật khẩu?</WrapperTextlight>
          </p>
          <p>
            Chưa có tài khoản?
            <WrapperTextlight>Tạo tài khoản</WrapperTextlight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={logologin}
            alt="logologin"
            preview={false}
            height={"203px"}
            width={"203px"}
          />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
