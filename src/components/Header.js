import React from "react";
import Settings from "./Settings";

export default function Header() {
    return (
        <div className="app-header">
            <div className="header-content">
                <div>Todo app </div>
                <Settings />
            </div>
        </div>
    )
}