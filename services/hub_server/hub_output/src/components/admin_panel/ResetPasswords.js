import { Button } from "antd";
import React from "react";
import generator from "generate-password";
import * as emailjs from 'emailjs-com'
import "./AdminPanel.css"
import axios from "axios";

export function ResetPasswords(props) {
    const email = props.email

    const generatePassword = () => {
        const pwd = generator.generate({
            length: 10,
            numbers: true,
            lowercase: true,
            uppercase: true,
        })
        console.log(pwd, email)
        const templateParams = {
            from_name: "Administrator",
            to_name: email,
            cc_to: email,
            subject: 'Reset Password',
            message: JSON.stringify(pwd),
        }
        emailjs.send(
            'service_amxm0v9',
            'template_85evatp',
            templateParams,
            'user_Ji2FNBbsaD5oJv2uJI4OF'
        )
        const formData = new FormData();
        formData.append('password', pwd)
        const config = {
            method: 'put',
            url: 'http://localhost:5001/api/authentification/password/' + props.email,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')),
            },
            data: formData
        };

        axios(config)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })
    }


    return (
        <Button className="user-raw-btn" type='link' onClick={generatePassword}>
            Reset password
        </Button>
    )
}