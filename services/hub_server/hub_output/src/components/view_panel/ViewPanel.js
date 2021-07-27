import React from "react";
import 'antd/dist/antd.css'
import "../../index.css";
import Header from "../Header/Header";
import "./ViewPanel.css"
import zone_preview from "../../assets/MaskDetection_Banner-1-1.png"
import {StatComponent} from "./statComponent";
import {io} from "socket.io-client";


class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {preview: zone_preview, data: []};
    }


    componentDidMount() {
        this.socket = io('http://localhost:5001/web', {
            transports: ['websocket']
        })

        this.socket.on('connect', () => {
            console.log('Connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected');
        });

        this.socket.on('connect_error', (error) => {
            console.log('Connect error! ' + error);
        });

        this.socket.on('connect_timeout', (error) => {
            console.log('Connect timeout! ' + error);
        });

        this.socket.on('error', (error) => {
            console.log('Error! ' + error);
        });

        // Update image and text data based on incoming data messages
        this.socket.on('server2web', (msg) => {
            this.setState({
                preview: msg.image,
                data: msg.position
            })
        });
    }

    render() {
        return (
            <div className="fullScreen background   Primary">
                <Header name="ZONE"/>
                <div className="divFlex">
                    <div className="viewContainer">
                        <img src={this.state.preview} className="cameraPreview"
                             alt="cameraPreview"/>
                    </div>

                    <div className="containerZonePanel">
                        <div className="buttonZonePanel">
                            <input type="submit" value="ZONE A" className="zoneButtonSelected"/>
                            <input type="submit" value="ZONE B" className="zoneButtonUnselected"/>
                            <input type="submit" value="ZONE C" className="zoneButtonUnselected"/>
                            <input type="submit" value="ZONE D" className="zoneButtonUnselected"/>
                        </div>
                    </div>
                </div>
                <div className="statsPanel">
                    <StatComponent data={this.state.data}/>
                </div>
            </div>
        )
    }
}

export default ViewPanel;
