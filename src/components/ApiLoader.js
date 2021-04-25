import React from "react";
import Loader from "react-loader-spinner";

export default function ApiLoader(props) {
    const {height, width, color} = props;
    return (
        <Loader
            type="Puff"
            color={color || "#47a5ed"}
            height={height || 100}
            width={width || 100}
        />
    )
}