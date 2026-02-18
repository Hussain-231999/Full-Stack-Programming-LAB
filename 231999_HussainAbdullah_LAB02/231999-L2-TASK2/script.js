// Function to calculate the result
function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    const resultDiv = document.getElementById("result");

    // Validate inputs: Check if they are numbers
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = "Please enter valid numbers.";
        resultDiv.style.backgroundColor = "#f8d7da"; // Light red for error
        resultDiv.style.color = "#721c24";
        return;
    }

    // Validate division by zero
    if (operation === "/" && num2 === 0) {
        resultDiv.innerHTML = "Cannot divide by zero.";
        resultDiv.style.backgroundColor = "#f8d7da"; // Light red for error
        resultDiv.style.color = "#721c24";
        return;
    }

    let result;
    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            resultDiv.innerHTML = "Invalid operation.";
            return;
    }

    // Display the result
    resultDiv.innerHTML = `Result: ${result}`;

    // Bonus: Change background color based on positive or negative value
    if (result > 0) {
        resultDiv.style.backgroundColor = "#d4edda"; // Light green for positive
        resultDiv.style.color = "#155724";
    } else if (result < 0) {
        resultDiv.style.backgroundColor = "#f8d7da"; // Light red for negative
        resultDiv.style.color = "#721c24";
    } else {
        resultDiv.style.backgroundColor = "#fff3cd"; // Light yellow for zero
        resultDiv.style.color = "#856404";
    }
}

// Event listener for the calculate button
document.getElementById("calculate").addEventListener("click", calculate);