// "use strict";

import ReactDOM from "react-dom";
import { FlapDisplay, Presets } from "react-split-flap-effect";

function Clock() {
    return <FlapDisplay chars={Presets.ALPHANUM} length={10} value={"Hello"} />;
}

let domContainer = document.querySelector("#clock");
ReactDOM.render(<Clock />, domContainer);
