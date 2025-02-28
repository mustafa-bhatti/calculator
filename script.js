const numberBtn = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const currentText = document.querySelector(".current");
console.log(numberBtn);

numberBtn.forEach((number) => {
    number.addEventListener("click",(e) => {
        console.log(e.target.innerText);
        currentText.innerText += e.target.innerText;
    })
})