import React, {useState} from "react";

const Item = ({message, index, deleteTodos}) => {

    const deleteItems = () => {
        deleteTodos(function(prev){
            console.log(index);
            return prev.filter(item => item.index !== index)
        })
    }

    return(
        <li className="todo-app__item">
            <div className="todo-app__checkbox" id="box">
                <input id={index} type="checkbox"/>
                <label htmlFor={index}></label>
            </div>
            <h1 className="todo-app__item-detail">{message}</h1>
            <img onClick={deleteItems} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP2j_jtsuLU9ojNG6Oen_duYe28dh7XBB7w&usqp=CAU" className="todo-app__item-x"/>
        </li>
    )
    
    
}

export default Item