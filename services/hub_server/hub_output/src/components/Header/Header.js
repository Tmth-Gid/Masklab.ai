import React from 'react';
import './header.css';
import {Button} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {NavigateMenu} from "./NavigateMenu";
import DocumentTitle from "react-document-title"

export default function Header(props) {

    const onClick = () => {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/';
    }

    return (
        <div className="header">
            <DocumentTitle title={props.name}/>
            <div className="nav_menu">
                <p>{props.name}</p>
            </div>
            <NavigateMenu/>
            <Button className="return_btn" onClick={onClick}>
                <p>Sign Out</p>
                <div className="button_icon">

                    <LogoutOutlined className="logout_icon"/>
                </div>
            </Button>
        </div>

    )
}
