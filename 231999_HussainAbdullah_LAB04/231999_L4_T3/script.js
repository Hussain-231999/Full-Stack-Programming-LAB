let form = document.getElementById("my_form");
let name_input = document.getElementById("name");
let email_input = document.getElementById("email");
let password_input = document.getElementById("password");
let success_message = document.getElementById("success_message");

name_input.addEventListener("blur", function () {
    validate_name();
});

email_input.addEventListener("blur", function () {
    validate_email();
});

password_input.addEventListener("blur", function () {
    validate_password();
});

function validate_name() {
    let value = name_input.value.trim();
    let error = name_input.nextElementSibling;

    if (value === "") {
        error.textContent = "Name is required";
        name_input.classList.add("error_input");
        name_input.classList.remove("valid_input");
        return false;
    }

    error.textContent = "";
    name_input.classList.remove("error_input");
    name_input.classList.add("valid_input");
    return true;
}

function validate_email() {
    let value = email_input.value.trim();
    let error = email_input.nextElementSibling;

    if (value === "" || !value.includes("@")) {
        error.textContent = "Valid email required";
        email_input.classList.add("error_input");
        email_input.classList.remove("valid_input");
        return false;
    }

    error.textContent = "";
    email_input.classList.remove("error_input");
    email_input.classList.add("valid_input");
    return true;
}

function validate_password() {
    let value = password_input.value.trim();
    let error = password_input.nextElementSibling;

    if (value.length < 6) {
        error.textContent = "Password must be at least 6 characters";
        password_input.classList.add("error_input");
        password_input.classList.remove("valid_input");
        return false;
    }

    error.textContent = "";
    password_input.classList.remove("error_input");
    password_input.classList.add("valid_input");
    return true;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valid_name = validate_name();
    let valid_email = validate_email();
    let valid_password = validate_password();

    if (valid_name && valid_email && valid_password) {
        success_message.textContent = "Form submitted successfully!";
        form.reset();

        name_input.classList.remove("valid_input");
        email_input.classList.remove("valid_input");
        password_input.classList.remove("valid_input");
    } else {
        success_message.textContent = "";
    }
});