import {Button, Form, Input} from "antd";
import logo from "../../assets/masklab_logo.png";
import * as emailjs from "emailjs-com";
import "../../index.css";
import "./forgot_password.css";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";

export function ForgotPasswordForm() {
    const onFinish = async (values) => {
        const templateParams = {
            from_name: values.email,
        }
        await emailjs.send(
            'service_amxm0v9',
            'template_5cgjaje',
            templateParams,
            'user_Ji2FNBbsaD5oJv2uJI4OF'
        )
        window.location.href = 'http://localhost:3000';
    }

    return (
        <Form onFinish={onFinish} className="formContainer">
            <Form.Item className="containerImg containerItem paddingBottom">
                <img src={logo} className="logo" alt="logo_masklab"/>
            </Form.Item>
            <Form.Item className="containerInput" name="email" label="Enter your email address">
                <Input className="inputItem"/>
            </Form.Item>
            <Form.Item className="containerInput paddingBottom">
                <p className="containerItem MessageText">
                    A message will be send to your MaskLab’s admin to reset your
                    password.
                </p>
            </Form.Item>
            <Form.Item className="linkSubmit">
                <Button
                    className="buttonSubmit"
                    htmlType="submit"
                >
                    Back to Sign In
                </Button>
            </Form.Item>
        </Form>
    )
}