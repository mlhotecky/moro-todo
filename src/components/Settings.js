import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCog} from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
    return (
        <FontAwesomeIcon className="cursor-pointer" icon={faCog} size="lg" />
    )
}