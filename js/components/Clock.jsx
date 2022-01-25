import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { FlapDisplay, Presets } from "react-split-flap-effect";
import "react-split-flap-effect/extras/themes.css";

function Dimmer() {
    const [isOn, setIsOn] = useState(false);

    const toggleIsOn = () => {
        setIsOn(!isOn);
        console.log("Dimmer isOn:", isOn);
    };

    const handleKeyDown = (e) => {
        if (e.keycode == 13) toggleIsOn();
    };

    return (
        <div
            onKeyDown={handleKeyDown}
            className='dimmer'
            style={{ opacity: isOn ? "1" : "0" }}
        />
    );
}

function Clock() {
    const [time, setTime] = useState(new Date());

    const charSet = Presets.ALPHANUM + ":,";
    const now = () => new Date();
    const updateTime = () => setTime(now);

    const pad = (pad, str) => {
        if (typeof str === "undefined") return pad;
        return (str + pad).substring(0, pad.length);
    };

    const padText = (date) => {
        const arr = date
            .toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            .split(",");
        return pad("            ", arr[0]) + arr[1];
    };

    useEffect(() => {
        const timer = setInterval(updateTime, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    return (
        <div className='clock-container'>
            {/* Weekday */}
            <FlapDisplay
                className='gruvbox light-bottom'
                chars={charSet}
                length={9}
                value={time.toLocaleString("en-US", {
                    weekday: "long",
                })}
            />
            {/* Date */}
            <FlapDisplay
                className='gruvbox light-bottom'
                chars={charSet}
                length={17}
                value={padText(time)}
            />
            {/* Time */}
            <FlapDisplay
                className='gruvbox light-bottom'
                chars={charSet}
                length={11}
                value={time.toLocaleTimeString()}
            />
        </div>
    );
}

function App() {
    return (
        <>
            <Clock />
            <Dimmer />
        </>
    );
}

let domContainer = document.querySelector("#clock");
ReactDOM.render(<App />, domContainer);
