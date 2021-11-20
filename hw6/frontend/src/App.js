import React, { useState } from "react";
import "./App.css";
import { guess, startGame, restart } from "./axio";

const App = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");

    const handleGuess = async () => {
        try{
            const response = await guess(number);
            setStatus(response);
            if (response === "Equal")
                setHasWon(true);
            else
                setNumber("");
        }
        catch(error){
            console.log('err', error);
        }
    }
    
    const startMenu = 
        <div>
            <button onClick={async () => {
                await startGame();
                setHasStarted(true);
            }}>start game</button>
        </div>
    const gameMode = 
        <>
            <p>Guess a number between 1 to 100</p>
            <input value={number} onChange={(e) => setNumber(e.target.value)}></input>
            <button onClick={handleGuess} disabled={!number}>guess!</button>
            <p>{status}</p>
        </>
    const winningMode = 
        <>
            <p>you won! the number was {number}.</p>
            <button onClick={async () => {
                await restart();
                setHasWon(false);
                setStatus("");
                setNumber("");
            }}>restart</button> 
        </>
    const game = 
        <div>
            {hasWon ? winningMode : gameMode}
        </div>
    return (
        <div className="App">
            {hasStarted ? game : startMenu}
        </div>
    );
}

export default App;
