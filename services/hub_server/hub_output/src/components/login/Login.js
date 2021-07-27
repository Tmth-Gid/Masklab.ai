import React from "react";
import "../HomeForm.css";
import "../../index.css";
import {Waves} from "../animate_wave/Waves";
import {WaveUnder} from "../animate_wave/WaveUnder";
import {LoginForm} from "./LoginForm";

export default function Login() {

    return (
        <div>
            <div className="homeContainer">
                <LoginForm/>
            </div>
            <Waves/>
            <WaveUnder/>
        </div>
    );
}