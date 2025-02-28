const numberBtn = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const resultText = document.querySelector(".result");
const currentText = document.querySelector(".current");
const operator = document.querySelectorAll(".opr");
console.log(numberBtn);
let number1 = 0;
let number2 = 0;
let beforeOperator = true;
numberBtn.forEach((number) => {
    number.addEventListener("click",(e) => {
        currentText.innerText += e.target.innerText;
    })
})

operator.forEach((operator) => {
    operator.addEventListener("click",(e) => {
        if (beforeOperator) {
            number1 = +e.target.innerText;
            resultText.innerText = currentText.innerText + " " +  e.target.innerText + " ";
            currentText.innerText = "";
            beforeOperator = false;
        }
        else {
                console.log("current text",currentText.innerText);
                number2 = currentText.innerText;
                resultText.innerText +=" "+currentText.innerText;
        }
    })
})