import React from "react";
import "./style.css";

function scrapHeader(props) {

    return (
        <header className="sHeader">
            {props.children}
        </header>
    )
}

export default scrapHeader;