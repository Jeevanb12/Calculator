# 🧮 Calculator Web Application

A responsive calculator web application built using HTML, CSS, and JavaScript. The project supports basic arithmetic operations, keyboard input, fullscreen mode, responsive mobile UI, and automated end-to-end testing using Playwright.

## 🌐 Live Demo

[View Live Calculator]=> https://jeevanb12.github.io/Calculator/

## ✨ Features

- Addition, subtraction, multiplication, and division
- Decimal calculations
- Percentage calculations
- Positive/negative (`+/-`) operation
- Backspace functionality
- AC (All Clear) functionality
- Repeated `=` operations
- Operator switching
- Keyboard input support
- Fullscreen mode
- Exit fullscreen using `Esc`
- Responsive design for desktop and mobile devices
- Prevents excessive input from overflowing the display
- Division-by-zero handling

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Playwright
- GitHub Pages

## 🧪 Automated Testing

End-to-end testing is implemented using Playwright.

The test suite covers:

- Addition
- Subtraction
- Multiplication
- Division
- Decimal calculations
- Negative results
- `+/-` operation
- Percentage
- Division by zero
- Operator switching
- Three-number calculations
- Repeated equals
- Operator after equals
- Operator after equals with a new number
- Backspace
- AC
- Keyboard input
- Keyboard decimal input
- Keyboard Backspace
- Keyboard Escape
- Maximum input length

### Test Result

```text
Running 22 tests using 6 workers

22 passed

Project Structure
calculator/
│
├── index.html
├── cal.css
├── fun.js
│
├── tests/
│   └── calculator.spec.js
│
├── playwright.config.js
├── package.json
└── package-lock.json


Clone the repository:
git clone https://github.com/Jeevanb12/Calculator.git

Navigate into the project:
cd calculator

Open index.html using a local development server such as VS Code Live Server.

🧪 Run Playwright Tests

Install dependencies:

npm install

Run all tests:

npx playwright test

Run tests in headed mode:

npx playwright test --headed

View the HTML test report:

npx playwright show-report
📱 Responsive Design

The calculator is designed to work across:

Desktop
Tablet
Mobile devices

The UI automatically adapts to different screen sizes while maintaining the calculator's layout and usability.

📌 Project Highlights

This project demonstrates practical knowledge of:

DOM manipulation
Event handling
JavaScript functions
Conditional logic
State management
Keyboard events
Responsive CSS
Browser Fullscreen API
Error handling
End-to-end automated testing
GitHub Pages deployment

👨‍💻 Author

Jeevan B

[GitHub Profile]=> https://github.com/jeevanb12
