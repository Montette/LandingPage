(function () {

    const namePattern = /^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,})+(?:[\s-][a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+)*$/i,
        stringPattern = /^.{3,}$/,
        mailPattern = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/i,
        phonePattern = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/,
        requiredInputs = document.querySelectorAll('[required]');
    form = document.querySelector('.form');

    const formToJSON = elements => [...elements].reduce((obj, element) => { //transform nodeList of form inputs into array and then into JSOn format
        if (element.name) {
            obj[element.name] = element.value;
        }
        return obj;

    }, {});



    const showModal = (information) => {
        document.querySelector('.modal__container').classList.add('modal-visible');
        document.querySelector('.modal').classList.add('background-visible');
        document.querySelector('.modal__information').innerHTML = information;

    }

    const sendData = () => {
        const successMessage = 'Twoja wiadomość została pomyślnie wysłana.';
        const errorMessage = 'Wystąpił problem z połączeniem. Spróbuj ponownie później.';
        const url = 'https://formspree.io/monika.radosiewicz@gmail.com';
        let data = null; // reset sending data before every new request
        data = formToJSON(form.elements);
        fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                showModal(successMessage);
            })
            .catch(err => {
                console.log(err);
                showModal(errorMessage)
            })
    }

    const showFieldValidation = (input, inputIsValid) => {
        !inputIsValid ? input.classList.add('warning') : input.classList.remove('warning');
    }

    const validateInput = (input, reg) => {
        let inputIsValid = true;
        if (reg !== undefined) {
            if (!reg.test(input.value) || input.value === '') {
                inputIsValid = false;
            }
        } else {
            if (input.value === '') {
                inputIsValid = false;
            }
        }

        if (inputIsValid) {
            showFieldValidation(input, true);
            return true;
        } else {
            showFieldValidation(input, false);
            return false;
        }
    }

    const saveToLocalStorage = (input) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(input.name, input.value);
        } else {
            return
        }
    }

    const loadFromLocalStorage = () => {
        if (typeof localStorage !== 'undefined') {
            [...requiredInputs].forEach(input => {
                input.value = localStorage.getItem(input.name);
            })
        } else {
            return
        }
    }

    const validateForm = () => {
        [...requiredInputs].forEach(input => {
            input.addEventListener('change', () => {
                saveToLocalStorage(event.target);
            })
            if (input.name === 'message' || input.name === 'topic') {
                input.addEventListener('input', (event) => {
                    validateInput(event.target, stringPattern)
                })
            }
            if (input.name == 'name') {
                input.addEventListener('input', (event) => {
                    validateInput(event.target, namePattern)
                })
            }
            if (input.name == 'email') {
                input.addEventListener('input', (event) => {
                    validateInput(event.target, mailPattern)
                })
            }
            if (input.name == 'phone') {
                input.addEventListener('input', (event) => {
                    validateInput(event.target, phonePattern)
                })
            }

        })
    }

    const checkFormBeforeSending = (event) => {
        event.preventDefault();
        let formIsCorrect = true;
        [...requiredInputs].forEach(input => {
            const inputType = input.type.toLowerCase();
            const inputName = input.name.toLowerCase();
            if ((inputName === 'message' || inputName === 'topic') && validateInput(input, stringPattern) === false) {
                formIsCorrect = false;
            }

            if (inputName === 'name' && validateInput(input, namePattern) === false) {
                formIsCorrect = false;
            }

            if (inputName === 'email' && validateInput(input, mailPattern) === false) {
                formIsCorrect = false;
            }
            if (inputName === 'phone' && validateInput(input, phonePattern) === false) {
                formIsCorrect = false;
            }
        })

        if (formIsCorrect) {
            sendData();
            console.log('form is submitted');
        } else {
            return false;
        }
    }

    document.querySelector('.modal__button').addEventListener('click', () => {
        document.querySelector('.modal__container').classList.remove('modal-visible');
        document.querySelector('.modal').classList.remove('background-visible');
    })

    form.addEventListener('submit', (event) => {
        checkFormBeforeSending(event);
    })

    document.addEventListener('DOMContentLoaded', () => {
        validateForm();
        loadFromLocalStorage()
    })




}())