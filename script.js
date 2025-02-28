const numberBtn = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const resultText = document.querySelector(".result");
const currentText = document.querySelector(".current");
const operator = document.querySelectorAll(".opr");
const eq = document.querySelector(".eq");
console.log(numberBtn);
let number1 = 0;
let number2 = 0;
let beforeOperator = true;
let afterOperator = false;
let currentOp = "";
let afterEval = false;
numberBtn.forEach((number) => {
    number.addEventListener("click",(e) => {
        if (afterEval) {
            console.log("aftereval");
            clear();
        }
        currentText.innerText += e.target.innerText;
    })
})

operator.forEach((operator) => {
    operator.addEventListener("click",(e) => {

        if (beforeOperator && !afterEval) {
            number1 = currentText.innerText;
            resultText.innerText = currentText.innerText + " " +  e.target.innerText + " ";
            currentText.innerText = "";
            beforeOperator = false;
            currentOp = e.target.innerText;
            // operator = e.target.innerText;
            // console.log(operator);
        }
        else {
                afterOperator = true;
                number2 = currentText.innerText;
                resultText.innerText +=" "+currentText.innerText;
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
    afterOperator = false;
    currentOp = "";
    currentText.innerText = "";
    resultText.innerText = "";
    afterEval = false;

}
function evaluate(numA,numB,operator) {
    let result = 0;
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
                result = "ZeroDivisionError"
            }
            break;
        case "*":
            result = numA * numB;
            break;
       }
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
