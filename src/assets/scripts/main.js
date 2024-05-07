/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';

/**
 * Write any other JavaScript below
 */

+( function() {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
} )();


const form = document.getElementById('form');
const username = document.getElementById('username');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
   inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }   else {
            showSuccess(input);
        }
   }); 
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        }   else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        }   else {
            showSuccess(input);
        }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value ) {
        showError(input2, 'Passwords do not match');
    }
}

// Check if age is valid
function checkAge(input) {
    const ageValue = parseInt(input.value);
    if (isNaN(ageValue) || ageValue < 0 || ageValue >= 100) {
        showError(input, 'Age must be between 0 and 99');
    } else {
        showSuccess(input);
    }
}

// Check if the password is complex and therefore more secure
function checkPasswordSecurity(input) {
    const password = input.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+\-=\{\}\[\]|:;'"<>,.?/\\]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError(input, 'Password must contain at least 8 characters, including uppercase, lowercase, digits, and special characters: ` ~ ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \\ : " ; \' < > ? , . /');
    } else {
        showSuccess(input);
    }
}
// Get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);  
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    checkAge(age);
    checkPasswordSecurity(password);
});