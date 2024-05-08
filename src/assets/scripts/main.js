/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';

/**
 * Write any other JavaScript below
 */

/** FORMULARIO **/
const form = document.getElementById('form');
const username = document.getElementById('username');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'El correo electrónico no es válido');
    }
}

function checkRequired(inputArr) {
   inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} es obligatorio`);
        }   else {
            showSuccess(input);
        }
   }); 
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
            showError(input, `${getFieldName(input)} debe tener al menos ${min} caracteres`);
        }   else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} debe tener menos de ${max} caracteres`);
        }   else {
            showSuccess(input);
        }
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value ) {
        showError(input2, 'Las contraseñas no coinciden');
    }
}

function checkAge(input) {
    const ageValue = parseInt(input.value);
    if (isNaN(ageValue) || ageValue < 0 || ageValue >= 100) {
        showError(input, 'La edad debe estar entre 0 y 99 años');
    } else {
        showSuccess(input);
    }
}

function checkPasswordSecurity(input) {
    const password = input.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+\-=\{\}\[\]|:;'"<>,.?/\\]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError(input, 'La contraseña debe constar de al menos 8 caracteres, including mayúsculas, minúsculas, dígitos, y caracteres especiales: ` ~ ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \\ : " ; \' < > ? , . /');
    } else {
        showSuccess(input);
    }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);  
}

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