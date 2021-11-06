import React, { memo, useState } from "react";
import Btn from '../Components/Btn';

const Calculator = () => {
    const [calc, setCalc] = useState(""); // calculator output
    const [memory, setMemory] = useState("0"); // MR MC M+ M-
    const operators = ['+', '-', '*', '/', '.', '=', '%']; 
    const exception = ['e', 'o', 'r', 'N', 'a'];
    const updatecalc = value => {
        if (calc === '' && (operators.includes(value)) || 
            (operators.includes(calc.slice(-1)) && (operators.includes(value)))) // wrong input type
            return;
        if (value === '0' && operators.includes(calc.slice(-1))) // input 0 when empty
            return;
        if (value === '\xB1'){ // distance from 0
            if (calc === '' || calc === '0' || operators.includes(calc.slice(-1)))
                return;
            if (parseFloat(calc) > 0){ // + => -
                const num = '-' + calc;
                setCalc(num);
                return;
            }
            else if (parseFloat(calc) < 0){ // - => +
                const num = 0 - parseFloat(calc);
                setCalc(num.toString());
                return;
            }
        }
        if (value === '='){ // equal
            for (let i = 0; i < calc.length; i++){
                if (exception.includes(calc.slice(0, i))){ // error calculation
                    setCalc("error");
                    return;
                }
            }
            setCalc(eval(calc).toString()); // get the calculation
            if (eval(calc).toString() == '0') // reset to zero when euqal to 0
                setCalc("");
        }
        else{ // add input
            setCalc(calc + value);
            console.log(calc);
            if (calc.slice(-1) === '/' && value === '0') // divide 0
                setCalc("error");
        }
    }
    const removecalc = () => { // del btn
        setCalc(calc.slice(0, -1));
    }
    const claercalc = () => { // CE btn
        setCalc("");
    }
    const addmemory = () => { // M+
        if (calc === '' || operators.includes(calc.slice(-1)))
            return;
        const num = parseFloat(memory) + parseFloat(calc);
        setMemory(num.toString());
    }
    const minusmemory = () => { // M-
        if (calc === '' || operators.includes(calc.slice(-1)))
            return;
        const num = parseFloat(memory) - parseFloat(calc);
        setMemory(num.toString());
    }
    const memorytocalc = () => { // MR
        if (calc === '' || operators.includes(calc.slice(-1)))
            return;
        setCalc(memory);
        if (memory === '0')
            setCalc("");
    }
    const resetmemory = () => { // MC
        if (calc === '' || operators.includes(calc.slice(-1)))
            return;
        setMemory("0");
    }
    return (
        <>
        <div className="memory">
            <Btn keyValue={"MC"} onClick={resetmemory} />
            <Btn keyValue={"MR"} onClick={memorytocalc} />
            <Btn keyValue={"M+"} onClick={addmemory} />
            <Btn keyValue={"M-"} onClick={minusmemory} />
            <br></br>
            <p>Memory value : {memory}</p>
        </div>        
        <div className="calculator">
            <div className="calculator-input">
                <div className="result">
                    {calc || "0"}
                </div>
            </div>
            <div className="calculator-keypad">
                <div className="keys-function">
                    <Btn keyValue={"CE"} onClick={claercalc} />
                    <Btn keyValue={"DEL"} onClick={removecalc} />
                    <Btn keyValue={"mod"} onClick={() => updatecalc('%')} />
                    
                </div>
                <div className="keys-operators">
                    <Btn keyValue={"+"} onClick={() => updatecalc('+')} />
                    <Btn keyValue={"-"} onClick={() => updatecalc('-')} />
                    <Btn keyValue={"*"} onClick={() => updatecalc('*')} />
                    <Btn keyValue={"/"} onClick={() => updatecalc('/')} />
                    <Btn keyValue={"="} onClick={() => updatecalc('=')} />
                    
                </div>
                <div className="keys-numbers">
                    <Btn keyValue={9} onClick={() => updatecalc('9')} />
                    <Btn keyValue={8} onClick={() => updatecalc('8')} />
                    <Btn keyValue={7} onClick={() => updatecalc('7')} />
                    <Btn keyValue={6} onClick={() => updatecalc('6')} />
                    <Btn keyValue={5} onClick={() => updatecalc('5')} />
                    <Btn keyValue={4} onClick={() => updatecalc('4')} />
                    <Btn keyValue={3} onClick={() => updatecalc('3')} />
                    <Btn keyValue={2} onClick={() => updatecalc('2')} />
                    <Btn keyValue={1} onClick={() => updatecalc('1')} />
                    <Btn keyValue={"\xB1"} onClick={() => updatecalc("\xB1")} />
                    <Btn
                        className="key-dot"
                        keyValue={"."}
                        onClick={() => updatecalc('.')}
                    />
                    <Btn keyValue={0} onClick={() => updatecalc('0')} />
                </div>
                
            </div>
        </div>
        </>
    );
}

export default Calculator