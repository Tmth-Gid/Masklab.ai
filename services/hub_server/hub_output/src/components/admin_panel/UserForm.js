import { Form, Input, Modal, Button } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { UserAddOutlined } from '@ant-design/icons'
import "./UserForm.css"
import { RoleSelector } from "./RoleSelector";

export function UserForm() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        let formData = new FormData();
        formData.append('email', values.email);
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('password', values.password);
        formData.append('role', values.role);
        const config = {
            method: 'post',
            url: 'http://localhost:5001/api/authentification/register',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')),
            },
            data: formData
        };
        await axios(config)
            .then((response) => {
                console.log(response);
                setIsModalVisible(false);
            }, (error) => {
                console.log(error);
            })
        window.location.reload(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button onClick={showModal} className="add_user">
                <p>ADD NEW USER</p>
                <UserAddOutlined className="icon" />
            </Button>
            <Modal title="Add User" visible={isModalVisible} onCancel={handleCancel}
                   okButtonProps={{form: 'myForm', key: 'submit', htmlType: 'submit'}}>
                <Form onFinish={handleOk} id="myForm" layout="vertical">
                    <Form.Item
                        label="Email"
                        name="email"
                        key="email"
                        rules={[{ required: true, message: 'Please input email!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Firstname"
                        name="first_name"
                        key="first_name"
                        rules={[{ required: true, message: 'Please input firstname!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="LastName"
                        name="last_name"
                        key="last_name"
                        rules={[{ required: true, message: 'Please input lastname!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        key="password"
                        rules={[{ required: true, message: 'Please input password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        key="role"
                    >
                        <RoleSelector />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}