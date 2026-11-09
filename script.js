const display = document.getElementById("display");
const history = document.getElementById("history");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let shouldReset = false;

// Update display
function updateDisplay() {
  display.value = currentInput;
}

// Add numbers and decimal
function appendNumber(number) {

  if (currentInput === "Error") {
    currentInput = "0";
  }

  if (shouldReset) {
    currentInput = "0";
    shouldReset = false;
  }

  // Prevent duplicate decimal points
  if (number === "." && currentInput.includes(".")) {
    return;
  }

  // Add leading zero
  if (number === ".") {
    currentInput += ".";
  } else if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

// Add operators
function appendOperator(op) {

  if (currentInput === "Error") return;

  if (operator !== null && !shouldReset) {
    calculate();
  }

  firstNumber = parseFloat(currentInput);
  operator = op;
  shouldReset = true;

  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  history.textContent =
    firstNumber + " " + symbols[operator];
}

// Calculate result
function calculate() {

  if (operator === null || shouldReset) return;

  const secondNumber = parseFloat(currentInput);
  let result;

  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  // Division by zero protection
  if (operator === "/" && secondNumber === 0) {

    history.textContent = "Cannot divide by zero";
    currentInput = "Error";

    firstNumber = null;
    operator = null;
    shouldReset = true;

    updateDisplay();
    return;
  }

  switch (operator) {

    case "+":
      result = firstNumber + secondNumber;
      break;

    case "-":
      result = firstNumber - secondNumber;
      break;

    case "*":
      result = firstNumber * secondNumber;
      break;

    case "/":
      result = firstNumber / secondNumber;
      break;
  }

  // Prevent floating-point display issues
  result = Number(result.toPrecision(12));

  // Show previous calculation
  history.textContent =
    `${firstNumber} ${symbols[operator]} ${secondNumber} =`;

  currentInput = String(result);

  firstNumber = null;
  operator = null;
  shouldReset = true;

  updateDisplay();
}

// Percentage
function percentage() {

  if (currentInput === "Error") return;

  currentInput = String(
    parseFloat(currentInput) / 100
  );

  shouldReset = false;
  updateDisplay();
}

// Delete last character
function deleteLast() {

  if (currentInput === "Error" || shouldReset) {
    currentInput = "0";
    shouldReset = false;
  } else {
    currentInput = currentInput.slice(0, -1) || "0";
  }

  updateDisplay();
}

// Clear everything
function clearDisplay() {

  currentInput = "0";
  firstNumber = null;
  operator = null;
  shouldReset = false;

  history.textContent = "";

  updateDisplay();
}

// Dark / Light mode
function toggleTheme() {

  document.body.classList.toggle("light-mode");

  const themeButton = document.querySelector(".theme-btn");

  themeButton.textContent =
    document.body.classList.contains("light-mode")
      ? "☾"
      : "☀";
}
