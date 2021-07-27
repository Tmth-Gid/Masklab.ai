import {Button, Popconfirm} from "antd";
import {UserDeleteOutlined, DeleteOutlined} from "@ant-design/icons";
import React from "react";
import axios from 'axios';

export function DeleteButton(props) {
    const config = {
        method: 'delete',
        url: 'http://localhost:5001/api/authentification/delete_user/' + props.email,
        headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
    };

    const confirm = () => {
        axios(config)
            .then((response) => {
                console.log(response);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const cancel = (e) => {
        console.log(e);
    }

    return (
        <Popconfirm
            title="Are you sure you want to delete this User?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Delete"
            okType="danger"
            icon={<DeleteOutlined />}
            cancelText="No"
        >
            <Button danger>
                Delete
                <UserDeleteOutlined/>
            </Button>
        </Popconfirm>
    )
}