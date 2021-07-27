import React from "react";

import "../../index.css";
import "./NavigationPanel.css"
import HeaderDeco from "../Header/Header";
import {Link} from "react-router-dom";
import {VideoCameraAddOutlined, VideoCameraOutlined} from "@ant-design/icons";
import Footer from "../Footer/footer";


export default function NavigationPanel() {
    return (
        <div className="fullScreen">
            <HeaderDeco name="Navigation Panel"/>
            <div className="subcontainer">
                <div className="container">
                    <Link class="element zonePreview"
                          to="/view_panel/A"
                    >
                        <VideoCameraOutlined className="video_icon"/>
                        <h2>ZONE A</h2>
                    </Link>
                    <Link class="element zonePreview"
                          to="/view_panel/B"
                    >
                        <VideoCameraOutlined className="video_icon"/>
                        <h2>ZONE B</h2>
                    </Link>
                    <Link class="element zonePreview"
                          to="/view_panel/C"
                    >
                        <VideoCameraOutlined className="video_icon"/>
                        <h2>ZONE C</h2>
                    </Link>
                    <Link class="addnew"
                          to=""
                    >
                        <VideoCameraAddOutlined className="video_icon"/>
                        <h2 className="addnewbtn">ADD NEW ZONE </h2>
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}