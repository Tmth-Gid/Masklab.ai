import logo from "../../assets/masklab_logo.png";
import {Link} from "react-router-dom";
import React from "react";
import {Button, Form, Input, message} from "antd";
import axios from "axios";

export function LoginForm() {

    const Submit = (values) => {
        console.log(values)
        let formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        const config = {
            method: 'post',
            url: 'http://localhost:5001/api/authentification/login',
            data: formData
        };
        axios(config)
            .then((response) => {
                if (response.data.message === "Login Succeeded!") {
                    localStorage.setItem("user", JSON.stringify(response.data.access_token));
                    const parseJwt = (token = response.data.access_token) => {
                        try {
                            return JSON.parse(atob(token.split('.')[1]));
                        } catch (e) {
                            return null;
                        }
                    };
                    if (parseJwt().is_administrator === true) {
                        window.location.href = 'http://localhost:3000/admin_panel';
                    } else {
                        window.location.href = 'http://localhost:3000/navigation_panel';
                    }
                }
            }, (error) => {
                message.error('Email or Password Incorrect Please Try Again or Contact Administrator', 4);
                console.log(error);
            })
    }
    return (
        <Form className="formContainer" layout="vertical" onFinish={Submit}>
            <Form.Item className="containerImg containerItem paddingBottom">
                <img src={logo} className="logo" alt="logo_masklab"/>
            </Form.Item>
            <Form.Item className="containerInput paddingBottom"
                       label="Email"
                       name="email"
                       key="email"
                       rules={[{required: true, message: 'Please input email!'}]}
            >
                <Input className="inputItem"/>
            </Form.Item>
            <Form.Item className="containerInput paddingBottom"
                       label="Password"
                       name="password"
                       key="password"
                       rules={[{required: true, message: 'Please input password!'}]}
            >
                <Input.Password className="inputItem"/>
            </Form.Item>
            <Form.Item className="containerInput paddingBottom">
                <Link
                    to="/begin_password_reset"
                    className="containerItem buttonText"
                >
                    Forgot your password ?
                </Link>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="buttonSignIn">
                    Sign In
                </Button>
            </Form.Item>
        </Form>
    )
}