import React, { useState } from "react";
import Btn from '../Components/Btn';

const Calculator = () => {
    const [calc, setCalc] = useState("");
    const operators = ['+', '-', '*', '/', '.', '='];
    const exception = ['e', 'o', 'r'];
    const updatecalc = value => {
        if (calc === '' && (operators.includes(value)) || 
            (operators.includes(calc.slice(-1)) && (operators.includes(value))))
            return;
        
        if (value === '='){
            for (let i = 0; i < calc.length; i++){
                if (exception.includes(calc.slice(0, i))){
                    setCalc("error");
                    return;
                }
            }
            if (calc.slice(-1) === '%'){
                setCalc(eval(calc.slice(0, -1) / 100).toString());
                return;
            }
            setCalc(eval(calc).toString());
            if (eval(calc).toString() == '0')
                setCalc("");
        }
        else{
            setCalc(calc + value);
            if (calc.slice(-1) === '/' && value === '0')
                setCalc("error");
        }
    }
    const removecalc = () => {
        setCalc(calc.slice(0, -1));
    }
    const claercalc = () => {
        setCalc("");
    }
    return (
        <div className="calculator">
        <div className="calculator-input">
            <div className="result">
                {calc || "0"}
            </div>
        </div>
        <div className="calculator-keypad">
            <div className="keys-function">
            <Btn keyValue={"c"} onClick={claercalc} />
            <Btn keyValue={"DEL"} onClick={removecalc} />
            <Btn keyValue={"%"} onClick={() => updatecalc('%')} />
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
            <Btn
                className="key-dot"
                keyValue={"."}
                onClick={() => updatecalc('.')}
            />
            <Btn
                className="key-numbers"
                keyValue={0}
                onClick={() => updatecalc('0')} 
            />
            </div>
        </div>
        </div>
    );
}

export default Calculator