const operands = document.querySelectorAll(".oprnd");
const operators = document.querySelectorAll(".oprtr");
const equalBtn = document.querySelector(".equal");
const scndScreen = document.querySelector("#secondary>span");
const prmScreen = document.querySelector("#primary>span");
const clearBtn = document.querySelector(".clear");
const dltBtn = document.querySelector(".delete");

let operand1, operator, result, prevoprtr, flag = 0;
let calc = new Calculator;

clearBtn.addEventListener("click", clear);

dltBtn.addEventListener("click", () => {
    prmScreen.textContent = prmScreen.textContent.slice(0, -1);
})

operands.forEach(operand => operand.addEventListener("click", function () {
    if (flag == 1) {
        clear();
        flag = 0;
    }
    if (prmScreen.textContent.includes('.'))
        document.querySelector('.dot').classList.add('disabledbutton');
    else
        document.querySelector('.dot').classList.remove('disabledbutton');
    if (prmScreen.textContent.length < 13)
        prmScreen.textContent = prmScreen.textContent + operand.textContent;
}))

operators.forEach(operator => operator.addEventListener("click", function () {

    if (scndScreen.textContent == '' && prmScreen.textContent != '') {
        operand1 = prmScreen.textContent;
        scndScreen.textContent = prmScreen.textContent;
        prevoprtr = operator.textContent;
        prmScreen.textContent = '';
        return;
    }
    if (scndScreen.textContent != '' && prmScreen.textContent != '') {
        if (flag == 1) {
            prevoprtr = operator.textContent;
            scndScreen.textContent = 'ANS' + prevoprtr;
            flag = 0;
            prmScreen.textContent = '';
        }
        else {
            result = calc.calculate(operand1, prmScreen.textContent, prevoprtr);
            scndScreen.textContent = result;
            operand1 = result;
            prevoprtr = operator.textContent;
            prmScreen.textContent = '';
        }
    }

}))

equalBtn.addEventListener("click", function () {
    if (scndScreen.textContent == '' && prmScreen.textContent != '') {
        scndScreen.textContent = prmScreen.textContent;
        result = prmScreen.textContent;
        operand1 = result;
        flag = 1;
    }
    else if (scndScreen.textContent != '' && prmScreen.textContent != '') {
        result = calc.calculate(operand1, prmScreen.textContent, prevoprtr)
        prmScreen.textContent = result;
        scndScreen.textContent = result;
        operand1 = result;
        flag = 1;
    }
})


function Calculator(op1, op2, oprtr) {
    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => +a + +b,
        "*": (a, b) => a * b,
        "/": (a, b) => { a / b },
    };

    this.calculate = function (a, b, op) {

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        if (b == 0 && op == '/')
            return '/ by 0 error';
        let total = this.methods[op](a, b);
        return (Math.round(total * 1000)) / 1000;
    };

}

function clear() {
    prmScreen.textContent = '';
    scndScreen.textContent = '';
    result = 0;
    operand1 = 0;
    prevoprtr = '';
}
console.log(clearBtn)