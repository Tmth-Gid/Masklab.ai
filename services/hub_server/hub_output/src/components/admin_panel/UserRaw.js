import {Button, Form, Input} from "antd";
import axios from "axios";
import {ResetPasswords} from "./ResetPasswords";
import {RoleSelector} from "./RoleSelector";
import {useState} from "react";

export function UserRaw(props) {
    console.log(props.value)
    const [roles, setRoles] = useState(props.role);

    function handleChange(newValue) {
        setRoles(newValue);
    }

    const Submit = async (values) => {
        const formData = new FormData();
        formData.append('email', values.email)
        formData.append('first_name', values.first_name)
        formData.append('last_name', values.last_name)
        formData.append('role', roles)
        formData.append('password', values.password)
        const config = {
            method: 'put',
            url: 'http://localhost:5001/api/authentification/user/' + props.email,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')),
            },
            data: formData
        };
        console.log(config)
        await axios(config)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })
        window.location.reload(false);
    };
    return (
        <Form className="user-raw" onFinish={Submit} layout='vertical'>
            <Form.Item
                className="user-raw-row"
                label="Email"
                name="email"
                initialValue={props.email}
                value={props.email}
            >
                <Input disabled/>
            </Form.Item>

            <Form.Item
                className="user-raw-row"
                label="Firstname"
                name="first_name"
                initialValue={props.firstName}
                value={props.firstName}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                className="user-raw-row"
                label="LastName"
                name="last_name"
                initialValue={props.lastName}
                value={props.lastName}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                className="user-raw-row"
                label="Password"
                name="password"
            >
                <ResetPasswords/>
            </Form.Item>
            <Form.Item
                className="user-raw-row"
                label="Role"
                name="role"
            >
                <RoleSelector roleselect={props.role} onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                className="user-raw-row-btn"
            >

                <Button
                    className="user-raw-btn"
                    htmlType="submit"
                >
                    Save New Data
                </Button>
            </Form.Item>
        </Form>
    )
}