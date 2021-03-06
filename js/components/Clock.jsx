import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { FlapDisplay, Presets } from "react-split-flap-effect";
import "react-split-flap-effect/extras/themes.css";

function Dimmer() {
    const [opacity, setOpacity] = useState("0");

    const toggleOpacity = () => {
        const newOpacity = opacity === "0" ? "1" : "0";
        setOpacity(newOpacity);
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Enter") toggleOpacity();
        };
        window.addEventListener("keydown", onKey, false);

        return () => {
            window.addEventListener("keydown", onKey, false);
        };
    }, []);

    return (
        <div
            className='dimmer'
            style={{ opacity: opacity }}
            onClick={toggleOpacity}
        />
    );
}

function Clock() {
    const [time, setTime] = useState(new Date());

    const charSet = Presets.ALPHANUM + ":,";
    const now = () => new Date();
    const updateTime = () => setTime(now);

    const padText = (date) => {
        const arr = date
            .toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            .split(",");
        return arr[0].toString(0).padEnd(12, " ") + arr[1];
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

let domContainer = document.getElementById("clock");
ReactDOM.render(<App />, domContainer);
