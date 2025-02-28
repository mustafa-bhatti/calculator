const numberBtn = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const resultText = document.querySelector(".result");
const currentText = document.querySelector(".current");
const operatorBtn = document.querySelectorAll(".opr");
const eq = document.querySelector(".eq");
const delBtn = document.querySelector(".delete");
const dotBtn = document.querySelector(".dot");

let number1 = 0;
let number2 = 0;
let beforeOperator = true;
let currentOp = "";
let afterEval = false; //turn it off after every evaluration
let result = 0;
let tempNum = 0;
let zeroCheck = false;
let dotCheck = false;   


function addNumber(num) {
    if (afterEval || zeroCheck) {
        clear();
    }
    if (currentText.innerText.length<15){
    currentText.innerText += num;
    }
}

function addOperator(operator){
    if (zeroCheck) {
        clear();
        return;
    }
    let onlyDotCheck = (currentText.innerText != ".");
    if (beforeOperator && currentText.innerText.length > 0 && onlyDotCheck) {
        number1 = currentText.innerText;
        resultText.innerText = currentText.innerText + " " +  operator + " ";
        tempNum = number1;
        currentText.innerText = "";
        beforeOperator = false;
        currentOp = operator;
        afterEval = false;
        dotCheck = false;
        // operator = operator;
        // console.log(operator);
    }
    else {  
            if (currentOp == operator && onlyDotCheck){
                if (!afterEval) {
                    number2 = currentText.innerText;
                    resultText.innerText +=" "+currentText.innerText;
                    evaluate(+number1,+number2,currentOp)
                    afterEval = true;
            }   else {
                    number1 = result;
                    resultText.innerText = number1 + " " + currentOp + " ";
                    currentText.innerText= "";
                    afterEval = false;} 
        }
            else {
            resultText.innerText = tempNum + " " +  operator + " ";
            currentOp = operator;

        }
    }
   if (operator == "CE") {
        clear();}
}
function clear() {
    number1 = 0;
    number2 = 0;
    beforeOperator = true;
    currentOp = "";
    afterEval = false;
    result = 0;
    tempNum = 0;
    zeroCheck = false;
    dotCheck = false;
    currentText.innerText = "";
    resultText.innerText = "";

}
function evaluate(numA,numB,operator) {
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
    if (!Number.isInteger(result)) {
        result = roundTo(result,15)
    }
    currentText.innerText = result;

}
function roundTo(value, decimals) {
    let rounded =  Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    if (rounded.length > 15) {
        return rounded.toExponential();
    }
    return rounded;
}
function evalOperation() {
    if (!beforeOperator && currentText.innerText.length > 0) {
        resultText.innerText +=" "+currentText.innerText;
        number2 = currentText.innerText;
        evaluate(+number1,+number2,currentOp);
    }
}

function deleteLast(){
    if (currentText.innerText.length > 0) {
        currentText.innerText = currentText.innerText.substring(0,currentText.innerText.length-1)
    }
}

function addDot() {
    if(!dotCheck){
        dotCheck = true;
        currentText.innerText += ".";
    }
}
numberBtn.forEach((number) => {
    number.addEventListener("click",(e) => {
        addNumber(e.target.innerText);
    })
})

operatorBtn.forEach((operatorB) => {
    operatorB.addEventListener("click",(e)=> {
        addOperator(e.target.innerText);
    })    
});

eq.addEventListener("click", evalOperation);
delBtn.addEventListener("click", deleteLast);
dotBtn.addEventListener("click", addDot);