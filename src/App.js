import { useState, useRef } from "react";

import style from "./App.css";
import icon from "./assets/icons/inputIcon.svg";

const App = () => {
    const [ result, setResutl ] = useState("");
    const input = useRef(null);

    const checkNationalCode = () => {
        let nationalCode = input.current.value;

        if(!nationalCode || nationalCode === ""){
            setResutl("لطفا یک عدد ۱۰ رقمی را وارد کنید");
            return;
        }

        if(nationalCode.length === 8){
            const digitsArray = nationalCode.split("").reverse();
            digitsArray.push(0);
            digitsArray.push(0);

            nationalCode = digitsArray.reverse().join("");
        }

        if(nationalCode.length !== 10){
            setResutl("کد ملی باید ۱۰ رقم باشد");
            return;
        }

        nationalCode = nationalCode.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

        let sumOfDigits = 0;

        nationalCode.split("").reverse().forEach((digit, index) => {
            if(index + 1 < 2){
                return;
            }

            sumOfDigits += (+digit * (index + 1));
        });

        const remainder = sumOfDigits % 11;

        let checkDigit = 0;
        if(remainder < 2){
            checkDigit = remainder;
        }
        else{
            checkDigit = 11 - remainder;
        }

        +nationalCode[nationalCode.length - 1] === checkDigit ? setResutl("کد ملی معتبر است") : setResutl("کد ملی معتبر نیست");
    };

    const renderRsult = () => {
        if(result === "کد ملی معتبر است"){
            return <span className="result-confirm">{ result }</span>
        }
        else if(result === "در حال نوشتن"){
            return <span className="result-info">{ result }</span>
        }
        else{
            return <span className="result-error">{ result }</span>
        }
    };

    return (
        <div className="main-container">
            <div className="card">
                <div className="title-container">
                    <span className="title">کد ملی را وارد کنید</span>
                </div>
                <div className="input-container">
                    <div className="input-main">
                        <div className="icon" style={{ backgroundImage: `url("${ icon }")` }}></div>
                        <input className="input" type="text" ref={ input } onBlur={ () => setResutl("") } onClick={ () => setResutl("در حال نوشتن") }/>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button" onClick={ checkNationalCode }>برسی</button>
                </div>
                <div className="result">
                    {
                        renderRsult()
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
