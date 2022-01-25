import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";

export default {
    input: "js/components/Clock.jsx",
    output: {
        file: "js/build/Clock.js",
        format: "iife",
        sourcemap: true,
        // globals: {},
    },
    // external: [],
    plugins: [
        resolve({ extensions: ["*", ".js", ".jsx", ".json"] }),
        commonjs(),
        babel({
            presets: [["@babel/preset-react", { runtime: "automatic" }]],
            babelHelpers: "bundled",
        }),
        css(),
    ],
};
