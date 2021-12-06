/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState, useEffect } from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Some functions may be added here! */}
    const showDiff = () => {
      if (showPanel == true)
        setShowPanel(false)
      else
        setShowPanel(true)
    }
    const startOnClick = () => {
      console.log("startOnClick")
      if(!error) startGameOnClick();
      else console.log("Error value: cannot start game!");
    }
    const checkError = (idx, num) => {
      let MINENUM = (idx === 0) ? num : mineNum;
      let BOARDSIZE = (idx === 1) ? num : boardSize;
      console.log(MINENUM, BOARDSIZE);
      if( BOARDSIZE * BOARDSIZE < MINENUM ) setError(true);
      else setError(false);
    }
    return(
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
            {/* -- TODO 1-1 -- */}
          <button className = "btn" onClick={startOnClick}>Start Game</button>
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
          <div className = "controlContainer">
            <button className = "btn" onClick={showDiff}>Difficulty Adjustment</button>
            {showPanel ? 
                        <div className='controlWrapper'> 
                            <div className ='error' style = {{ color: (error) ? '#880000':'transparent'}}>ERROR: Mines number and board size are invalid!</div>
                          <div className = "controlPanel">
                            <div className = "controlCol">
                                <p className = 'controlTitle'>Mines Number</p>
                                <input  type='range' min='1' max='50' defaultValue='10'   step='1' onChange = {({ target: { value: num } }) => {mineNumOnChange(num);  checkError(0, num);}}/>
                                <p className = 'controlNum' style = {{color: (error) ? '#880000' : '#0f0f4b'}}>{mineNum}</p>
                            </div>
                            <div className = "controlCol">
                                <p className = 'controlTitle'>Board Size (n×n)</p>
                                <input type='range' min='1' max='20' defaultValue='8'  step='1' onChange = {({ target: { value: num } }) => {boardSizeOnChange(num);  checkError(1, num);}}/> 
                                <p className = 'controlNum' style = {{color: (error) ? '#880000' : '#0f0f4b'}}>{boardSize}</p>
                            </div>
                          </div>
                        </div> 
                        : 
                        <div></div>
                    }
          </div>
        </div>
    );

}
export default HomePage;   