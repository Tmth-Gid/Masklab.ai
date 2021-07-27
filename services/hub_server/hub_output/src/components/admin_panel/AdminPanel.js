import React, {useEffect, useState} from "react";
import {Table} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

import "../../index.css";
import "./AdminPanel.css";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import {UserForm} from "./UserForm";
import {DeleteButton} from "./DeleteButton";
import {ResetPasswords} from "./ResetPasswords";
import {UserRaw} from "./UserRaw";


export default function AdminPanel() {
    const [user, getUser] = useState('');

    useEffect(() => {
        const parseJwt = (token = localStorage.getItem('user')) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return null;
            }
        }
        if (parseJwt().is_administrator === false) {
            window.location.href = 'http://localhost:3000/navigation_panel';

        }
    })

    useEffect(() => {
        fetchUser();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const config = {
        method: 'get',
        url: 'http://localhost:5001/api/authentification/users',
        headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
    };
    const fetchUser = () => {
        axios(config)
            .then((response) => {
                console.log(response);
                const allUsers = response.data.users;
                getUser(allUsers);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    let columns = [
        {
            title: 'Firstname',
            dataIndex: 'first_name',
            align: 'center'
        },
        {
            title: 'Lastname',
            dataIndex: 'last_name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center'
        },
        {
            title: 'Password',
            align: 'center',
            render: (record) => (
                <ResetPasswords lastName={record.last_name}
                                firstName={record.first_name}
                                email={record.email}
                                role={record.role}
                                password={record.password}/>
            )
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            align: 'center'
        },
        {
            title: <UserForm/>,
            align: 'right',
            render: (record) => record.role !== "Administrator" ? (
                <DeleteButton email={record.email}/>
            ) : null
        },
    ];
    return (
        <div className="fullScreen">
            <Header name="Admin Panel"/>
            <div className="panelContainer">
                <Table
                    columns={columns}
                    dataSource={user}
                    rowKey={record => record.email}
                    expandedRowRender={record => <UserRaw lastName={record.last_name}
                                                          firstName={record.first_name}
                                                          email={record.email}
                                                          role={record.role}
                                                          password={record.password}
                    />}
                    pagination={{pageSize: 15}}
                    scroll={{y: 'calc(100vh - 20%)'}}
                />
            </div>
            <Footer/>
        </div>
    )
}