import React, {useState, Component} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import List from "../Components/List";

let index = 0;

const App = () => {
    const [Input, updateInput] = useState(""); // input值
    const [Todos, updateTodos] = useState([]); // 所有todo

    const handleChange = e => { 
        updateInput(e.target.value);
    }
    
    const handleKeyUp = e => {
        if (e.keyCode === 13){
            if (! e.target.value || /^\s*$/.test(e.target.value)){
                return;
            }
            index = Math.floor(Math.random() * 10000)
            let message = e.target.value;
            updateTodos(function(prev){
                return [...prev, {message, index}];
            })
            
            //console.log(Todos);
            updateInput("");
        }
    }

    return (
        <>
            <Header text="todos" />
            <section className="todo-app__main">
                <input value={Input} onKeyUp={handleKeyUp} onChange={handleChange} className="todo-app__input" placeholder="What needs to be done?"/>    
                <ul className="todo-app__list">
                    <List Todos={Todos} deleteTodos={updateTodos}/>
                </ul>
            </section>
            <Footer Todos={Todos}/>
        </>
    );
}

export default App