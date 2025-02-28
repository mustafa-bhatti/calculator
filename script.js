const numberBtn = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const resultText = document.querySelector(".result");
const currentText = document.querySelector(".current");
const operator = document.querySelectorAll(".opr");
const eq = document.querySelector(".eq");
const delBtn = document.querySelector(".delete");

let number1 = 0;
let number2 = 0;
let beforeOperator = true;
let currentOp = "";
let afterEval = false; //turn it off after every evaluration
let result = 0;
let tempNum = 0;
let zeroCheck = false;

numberBtn.forEach((number) => {
    number.addEventListener("click",(e) => {
        if (afterEval || zeroCheck) {
            clear();
        }
        if (currentText.innerText.length<15){
        currentText.innerText += e.target.innerText;
        }
    })
})

operator.forEach((operator) => {
    operator.addEventListener("click",(e) => {
        if (zeroCheck) {
            clear();
            return;
        }
        if (beforeOperator && currentText.innerText.length > 0) {
            number1 = currentText.innerText;
            resultText.innerText = currentText.innerText + " " +  e.target.innerText + " ";
            tempNum = number1;
            currentText.innerText = "";
            beforeOperator = false;
            currentOp = e.target.innerText;
            afterEval = false;
            // operator = e.target.innerText;
            // console.log(operator);
        }
        else {  
                if (currentOp == e.target.innerText){
                    if (!afterEval) {
                        number2 = currentText.innerText;
                        resultText.innerText +=" "+currentText.innerText;
                        evaluate(+number1,+number2,currentOp)
                        afterEval = true;
                } else {
                        number1 = result;
                        resultText.innerText = number1 + " " + currentOp + " ";
                        currentText.innerText= "";
                        afterEval = false;} 
            }
            else {
                resultText.innerText = tempNum + " " +  e.target.innerText + " ";
                currentOp = e.target.innerText;

            }
        }
       if (e.target.innerText == "CE") {
            clear();
       }
    })
})
function clear() {
    number1 = 0;
    number2 = 0;
    beforeOperator = true;
    currentOp = "";
    afterEval = false;
    result = 0;
    tempNum = 0;
    zeroCheck = false;
    currentText.innerText = "";
    resultText.innerText = "";

}
function evaluate(numA,numB,operator) {
    console.log("Evaluate - ",numA,numB,operator);
    switch (operator) {
        case "+":
            result = numA + numB;
            break;
        case "-":
            result = numA - numB;
            break;
        case "/":
            if (numB != 0 ) {
                result = numA / numB;
            }
            else {
                zeroCheck = true;
                result = "ZeroDivisionError"
            }
            break;
        case "*":
            result = numA * numB;
            break;
       }
    beforeOperator = true;
    afterEval = true;
    currentText.innerText = result;
}

eq.addEventListener("click",(e) => {

    if (!beforeOperator && currentText.innerText.length > 0) {
        resultText.innerText +=" "+currentText.innerText;
        number2 = currentText.innerText;
        evaluate(+number1,+number2,currentOp);
    }

})

delBtn.addEventListener("click",(e) => {
    if (currentText.innerText.length > 0) {
        currentText.innerText = currentText.innerText.substring(0,currentText.innerText.length-1)
    }
})