import Wave from "react-wavify";
import "../../index.css";
import React from "react";

export function WaveUnder() {
    return (
        <div className="wave_under">
            <Wave
                fill="#7771EF"
                paused={false}
                options={{
                    height: 20,
                    amplitude: 30,
                    speed: 0.15,
                    points: 3,
                }}
            />
        </div>
    )
}