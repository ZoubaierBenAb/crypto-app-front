import { Button, Checkbox, Form, Input, ConfigProvider, theme, message } from "antd";
import "../components/components-style/Signin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reduxSlices/authSlice";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  useEffect(()=>{
if (isError){
  toast.error(errorMessage)
}
if(isSuccess || user){
  window.location.reload();
}
  },[user,isError,errorMessage,dispatch,navigate])




  const handleSignup = async (e) => {
    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    const response = dispatch(register(userData));
  };




  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="sign-in">
        <h1 className="message">
          Welcome to our crypto website! Sign in and start exploring the world
          of cryptocurrencies.
        </h1>

        <Form
          className="form"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSignup}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={handleChange} name="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={handleChange} name="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={handleChange} name="password" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
export default Signup;
