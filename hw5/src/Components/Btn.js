import React from "react";

const Btn = (props) => {
    return (
        <button className={`${props.className}`} onClick={() => props.onClick(props.keyValue)}>
            {props.keyValue}{" "}
        </button> 
    );
}

export default Btn