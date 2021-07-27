import React from "react";
import Wave from "react-wavify";
import "../../index.css";

export function Waves() {
    return (
        <div className="wave">
            <Wave
                fill="#5850EC"
                paused={false}
                options={{
                    height: 25,
                    amplitude: 30,
                    speed: 0.15,
                    points: 4,
                }}
            />
        </div>
    )
}