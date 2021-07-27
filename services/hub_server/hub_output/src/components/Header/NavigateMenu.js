import {Button, Dropdown, Menu} from "antd";
import {
    BarChartOutlined, HomeOutlined,
    PushpinOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

export function NavigateMenu() {

    const {SubMenu} = Menu;

    const parseJwt = (token = localStorage.getItem('user')) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }
    const menu = (
        <Menu className="menu" mode="vertical">
            <Menu.Item className="menu_item" icon={<PushpinOutlined />}>
                <a rel="noopener noreferrer" href="http://localhost:3000/navigation_panel">
                    <p>Navigation Panel</p>
                </a>
            </Menu.Item>
            <Menu.Item className="menu_item" icon={<BarChartOutlined />}>
                <a rel="noopener noreferrer" href="http://localhost:3000/stats_panel">
                    <p>Stats Panel</p>
                </a>
            </Menu.Item>
            <SubMenu title="View Panel" icon={<VideoCameraOutlined />}>
                <Menu.Item className="menu_item" icon={<HomeOutlined />}>
                    <a rel="noopener noreferrer" href="http://localhost:3000/view_panel">
                        <p>Zone A</p>
                    </a>
                </Menu.Item>
                <Menu.Item className="menu_item" icon={<HomeOutlined />}>
                    <a rel="noopener noreferrer" href="http://localhost:3000/view_panel/zoneB">
                        <p>Zone B</p>
                    </a>
                </Menu.Item>
                <Menu.Item className="menu_item" icon={<HomeOutlined />}>
                    <a rel="noopener noreferrer" href="http://localhost:3000/view_panel/zoneC">
                        <p>Zone C</p>
                    </a>
                </Menu.Item>
            </SubMenu>
            {parseJwt().is_administrator === true ? (
                <Menu.Item className="menu_item" icon={<UserOutlined />}>
                    <a rel="noopener noreferrer" href="http://localhost:3000/admin_panel">
                        <p>Admin Panel</p>
                    </a>
                </Menu.Item>
            ) : null}
        </Menu>
    );
    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <Button className="return_btn"><p>Menu</p></Button>
        </Dropdown>
    )
}