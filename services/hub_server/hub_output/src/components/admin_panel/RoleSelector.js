import {Select} from "antd";
import {useState} from "react";

export function RoleSelector(props) {
    const [role, setRole] = useState(props.roleselect);

    function handleChange(value) {
        setRole(value)
        props.onChange(value);
    }

    const roles = [
        {
            value: "Administrator",
            label: "Administrator"
        },
        {
            value: "Security Agent",
            label: "Security Agent"
        },
        {
            value: "Security Chief",
            label: "Security Chief"
        }
    ]

    return (
        <Select
            showSearch
            style={{width: 450}}
            value={role}
            optionFilterProp="children"
            onChange={handleChange}
            options={roles}
            filterOption={(input, option) =>
                option.children.indexOf(input.toLowerCase()) >= 0
            }
        >
        </Select>
    )
}