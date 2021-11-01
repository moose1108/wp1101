import React, {useState} from "react";
import Item from "./Item";

const List = ({Todos, deleteTodos}) => {
    return (
        <>{Todos.map((todo) => {
            const {message, index} = todo;
            return <Item message={message} index={index} deleteTodos={deleteTodos}/>
        })}</>
    )
}

export default List
