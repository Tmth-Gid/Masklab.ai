import React from 'react';
import './footer.css';
import logo from "../../assets/footer_masklab_logo.png";


export default function Footer() {

    return (
        <div className="footer">
            <img src={logo} className="footerLogo" alt="logo_masklab"/>
        </div>
    )
}
