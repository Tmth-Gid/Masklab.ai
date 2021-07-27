import React from "react";

import "../HomeForm.css";
import "../../index.css";
import { Waves } from "../animate_wave/Waves";
import { WaveUnder } from "../animate_wave/WaveUnder";
import { ForgotPasswordForm } from "./ForgotPasswordForm"

export default function ForgotPassword() {
    return (
        <div>
            <div className="homeContainer">
                <ForgotPasswordForm />
            </div>
            <Waves />
            <WaveUnder />
        </div>
    );
}

