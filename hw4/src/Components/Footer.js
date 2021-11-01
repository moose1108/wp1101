import React, {Component} from "react";

const Footer = ({Todos}) => {
    const total = Todos.length;
    console.log(total);
    return(
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">
                {total} tasks
            </div>
            <ul className="todo-app__view-buttons">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button>Clear complete</button>
            </div>
        </footer>
    )
}

export default Footer