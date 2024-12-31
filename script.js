// Get the screen element and buttons
const screen = document.getElementById('screen');
const keys = document.querySelectorAll('.key');
let currentInput = '0';
let previousInput = '';
let operator = null;

// Update the screen with the current input
function updateScreen() {
    screen.textContent = currentInput;
}

// Handle button clicks
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.getAttribute('data-key');

        if (keyValue === 'C') {
            // Clear the screen
            currentInput = '0';
            previousInput = '';
            operator = null;
            updateScreen();
        } else if (keyValue === '=') {
            // Calculate the result
            if (previousInput && operator) {
                currentInput = evaluate(previousInput, currentInput, operator);
                operator = null;
                previousInput = '';
                updateScreen();
            }
        } else if (['+', '-', '*', '/'].includes(keyValue)) {
            // Store the current input and operator
            if (previousInput && operator) {
                currentInput = evaluate(previousInput, currentInput, operator);
                updateScreen();
            }
            operator = keyValue;
            previousInput = currentInput;
            currentInput = '';
        } else {
            // Append the clicked number or dot to the current input
            if (currentInput === '0' && keyValue !== '.') {
                currentInput = keyValue; // Replace leading zero with the clicked number
            } else {
                currentInput += keyValue;
            }
            updateScreen();
        }
    });
});

// Evaluate function to perform the calculation
function evaluate(prev, curr, operator) {
    prev = parseFloat(prev);
    curr = parseFloat(curr);
    switch (operator) {
        case '+':
            return prev + curr;
        case '-':
            return prev - curr;
        case '*':
            return prev * curr;
        case '/':
            return prev / curr;
        default:
            return curr;
    }
}
