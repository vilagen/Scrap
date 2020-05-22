import React from "react";
import "./style.css";

function scrapHeader(props) {

	return (
		<header sytle={{width:"100%"}} className="sHeader">
				{props.children}
		</header>
	)
}

export default scrapHeader;