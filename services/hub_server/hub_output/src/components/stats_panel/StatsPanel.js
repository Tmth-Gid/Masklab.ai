import React from "react";

import "../../index.css";
import HeaderDeco from "../Header/Header";
import Footer from "../Footer/footer";
import {Table, Menu, Dropdown} from 'antd';
import 'antd/dist/antd.css'
import {DownOutlined} from '@ant-design/icons';
import axios from "axios";
import {Bar} from "react-chartjs-2";

export default class StatsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stats: []
        }
    }

    componentDidMount() {
        const config = {
            method: 'get',
            url: 'http://localhost:5001/api/analytics/stats',
        };

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        const extractColumn = (arr, column) => arr.map(x => parseInt(x[column]));

        axios(config)
            .then((response) => {
                const statistics = response.data.stats
                this.setState({
                    data: {
                        labels: ['With Mask', 'Without Mask'],
                        datasets: [
                            {
                                data: [
                                    extractColumn(statistics, "with_mask").reduce(reducer),
                                    extractColumn(statistics, "no_mask").reduce(reducer)
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)'
                                ]
                            },
                        ],
                    },
                    stats: [{
                        zone: "A",
                        with_mask: extractColumn(statistics, "with_mask").reduce(reducer),
                        no_mask: extractColumn(statistics, "no_mask").reduce(reducer)
                    }]
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="https://www.antgroup.com">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="https://www.aliyun.com">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title: 'Zone',
                dataIndex: 'zone',
                key: 'Zone',
            },
            {
                title: 'Stat',
                key: 'stat',
                render: () => (
                    <Bar
                        data={this.state.data}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            animation: {
                                duration: 0
                            },
                        }}
                    />
                )
            },
            {
                title: 'Run Time',
                key: 'Run Time',
            },
        ];
        return (
            <div className="fullScreen">
                <HeaderDeco name="Stats Panel"/>
                <div className="panelContainer">
                    <Table
                        columns={columns}
                        dataSource={this.state.stats}
                        pagination={{pageSize: 15}}
                        scroll={{y: 'calc(100vh - 20%)'}}/>
                </div>
                <Footer/>
            </div>
        )
    }
}