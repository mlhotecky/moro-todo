import React from "react";
import {Col, Row} from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function FooterLink(props) {
    const {icon, link, size} = props;
    return (
        <a href={link} target="_blank" className="footer-link">
            <FontAwesomeIcon className="cursor-pointer" icon={icon} size={size}/>
        </a>
    )
}