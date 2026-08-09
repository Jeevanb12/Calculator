function addToDisplay(value) {
    let currentText = display.innerText;
    let newText = currentText + value;

    let testText = document.createElement("span");
    testText.innerText = newText;

    let style = window.getComputedStyle(display);

    testText.style.position = "absolute";
    testText.style.visibility = "hidden";
    testText.style.whiteSpace = "nowrap";
    testText.style.fontFamily = style.fontFamily;
    testText.style.fontSize = style.fontSize;
    testText.style.fontWeight = style.fontWeight;
    testText.style.fontStyle = style.fontStyle;
    testText.style.letterSpacing = style.letterSpacing;

    document.body.appendChild(testText);

    let textWidth = testText.getBoundingClientRect().width;
    testText.remove();

    // FIX: Measure container (#box2) width instead of #display element width
    let box2 = document.getElementById("box2");
    let availableWidth =
        box2.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);

    if (textWidth <= availableWidth) {
        display.innerText = newText;
    }
}

function formatResult(result) {
    if (typeof result !== "number") return result; // Return string errors like "Cannot divide by 0" directly

    // Convert number to string
    let resultStr = result.toString();

    // If it's too long, format it to precision
    if (resultStr.length > 9) {
        // Handle floating point decimals gracefully
        return Number(result.toPrecision(8)).toString();
    }

    return resultStr;
}

let numbers = document.querySelectorAll(".number");
let display = document.getElementById("display");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let equals = document.getElementById("equals");
let decimal = document.getElementById("decimal");
let percent = document.getElementById("percent");
let multiply = document.getElementById("multiply");
let divide = document.getElementById("divide");
let firstNumber;
let operator;
let justCalculated = false;
let lastNumber;
let lastOperator;
let operatorAfterEquals = false;
let repeatedNumber;

numbers.forEach(function(button) {

    button.addEventListener("click", function() {

        if (display.innerText === "0" || justCalculated === true) {

            display.innerText = button.innerText;
            justCalculated = false;
            operatorAfterEquals = false;   // ADD THIS

        } else {

            addToDisplay(button.innerText);

        }

    });

});

// for AC
let clear = document.getElementById("clear");
clear.addEventListener("click", function() {
     display.innerText = "0";

    firstNumber = undefined;
    operator = undefined;
    justCalculated = false;
    lastNumber = undefined;
    lastOperator = undefined;
    operatorAfterEquals = false;
    repeatedNumber = undefined;

});

// BackSpace
let del=document.getElementById("del");
del.addEventListener("click",function(){
display.innerText=display.innerText.slice(0, -1);
if(display.innerText==="")
{
    display.innerText="0";
}
});


/// common function for all operators
function handleOperator(newOperator) {

      // Enter negative number as first number
    if (newOperator === "-" &&
        display.innerText === "0" &&
        operator === undefined) {

        display.innerText = "-";
        return;
    }
    // for entering after = operator
   if (justCalculated === true) {

    firstNumber = Number(display.innerText);
    repeatedNumber = firstNumber;

    operator = newOperator;
    operatorAfterEquals = true;

    return;
}

    // operator switching
    if (display.innerText === "0" && operator !== undefined) {
        operator = newOperator;
        return;
    }

    let currentNumber = Number(display.innerText);//7

    if (operator !== undefined) {

        let result = calculate(firstNumber, currentNumber, operator);

        if (result === "Cannot divide by 0") {
            display.innerText = result;
            operator = undefined;
            justCalculated = true;
            return;
        }
        firstNumber = result;

    } else {

        firstNumber = currentNumber;//5

    }

    operator = newOperator;//+

    display.innerText = "0";
}


// addition
plus.addEventListener("click", function() {
    handleOperator("+");
});


// subtraction
minus.addEventListener("click", function() {
    handleOperator("-");
});


// multiplication
multiply.addEventListener("click", function() {
    handleOperator("*");
});


// division
divide.addEventListener("click", function() {
    handleOperator("/");
});

// for decimal
decimal.addEventListener("click", function() {

    if (!display.innerText.includes(".")) {
        addToDisplay(".");
    }

});

// for +/-
let sign = document.getElementById("sign");

sign.addEventListener("click", function() {

    let number = Number(display.innerText);

    number = number * -1;

    display.innerText = formatResult(number);

});

// for percentage
percent.addEventListener("click", function() {

    let secondNumber = Number(display.innerText);

    if (operator === "+" || operator === "-") {
        secondNumber = firstNumber * secondNumber / 100;
    } else {
        secondNumber = secondNumber / 100;
    }

    display.innerText = formatResult(secondNumber);

});

// for three number calculation
function calculate(first, second, operator) {

    if (operator === "+") {
        return first + second;
    }

    if (operator === "-") {
        return first - second;
    }

    if (operator === "*") {
        return first * second;
    }

    if (operator === "/") {
        if(second===0)
        {
            return "Cannot divide by 0";
        }
        else
        {
            return first / second;
        }
        
    }
}


// for equal
equals.addEventListener("click", function() {

    let secondNumber = Number(display.innerText);//2
    let result;

    // for operator after equal =
   if (operatorAfterEquals === true) {

    result = calculate(firstNumber, repeatedNumber, operator);

    display.innerText = result;

    firstNumber = result;
    justCalculated = true;

    return;
}

    // First time pressing =
    if (operator !== undefined) {

        lastNumber = secondNumber; //2
        lastOperator = operator;//+

        result = calculate(firstNumber, secondNumber, operator);

        display.innerText = formatResult(result);

        operator = undefined;
        justCalculated = true;

    }

    // Pressing = again
    else if (lastOperator !== undefined) {

        let currentNumber = Number(display.innerText);

        result = calculate(currentNumber, lastNumber, lastOperator);

        display.innerText = formatResult(result);

        justCalculated = true;
    }
});

// Key Down logic
document.addEventListener("keydown", function(event) {

    // Numbers 0-9
 // Numbers 0-9
if (event.key >= "0" && event.key <= "9") {

    if (display.innerText === "0" || justCalculated === true) {

        display.innerText = event.key;
        justCalculated = false;
        operatorAfterEquals = false;   // ADD THIS

    } else {

        addToDisplay(event.key);

    }
}


    // Decimal
    if (event.key === ".") {
        decimal.click();
    }

    // Addition
    if (event.key === "+") {
        plus.click();
    }

    // Subtraction
    if (event.key === "-") {
        minus.click();
    }

    // Multiplication
    if (event.key === "*") {
        multiply.click();
    }

    // Division
    if (event.key === "/") {
        divide.click();
    }

    // Enter or =
    if (event.key === "Enter" || event.key === "=") {
        equals.click();
    }

    // Escape = AC
    // Escape or Delete or 'c' = AC Clear
if (event.key === "Escape" || event.key === "Delete" || event.key === "c" || event.key === "C") {
    clear.click();
}

    // %
    if (event.key === "%") {
        percent.click();
    }
    // backspace
    if(event.key==="Backspace")
    {
    del.click();
    }   

    // for full screen
    // Press 'f' or 'F' for Fullscreen toggle
if (event.key === "f" || event.key === "F") {
    fullscreen.click();
}
});
// for full screen
let fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener("click", function() {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Detect when fullscreen is exited, including pressing Esc
document.addEventListener("fullscreenchange", function() {

    if (document.fullscreenElement) {
        document.body.classList.add("fullscreen");
    } else {
        document.body.classList.remove("fullscreen");
    }

});