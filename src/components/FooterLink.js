import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function FooterLink(props) {
    const {icon, link, size} = props;
    return (
        <a href={link} target="_blank" rel="noreferrer"  className="footer-link">
            <FontAwesomeIcon className="cursor-pointer" icon={icon} size={size}/>
        </a>
    )
}