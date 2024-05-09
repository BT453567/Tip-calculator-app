const billAmount = document.getElementById("bill-input");
const numberOfPeople = document.getElementById("number-of-people-input");
const tipAmount = document.getElementById("tip-amount-value");
const totalAmount = document.getElementById("total-amount-value");

const tipButtons = document.querySelectorAll(".tip-button");
const buttonCustom = document.getElementById("tipCustom");
const buttonCustomInput = document.getElementById("tipCustomInput");
const resetButton = document.getElementById("reset-button");

const numberOfPeopleError = document.getElementById("numberOfPeopleError");

var billAmountValue = "0.00";
var numberOfPeopleValue = 0;
var tipSelected = false;
var tipValue = 0;

var tipAmountValue = 0.00;
var totalAmountValue = 0.00;


function resetValues() {

    resetButton.classList.remove('reset-button-active');
    resetButton.disabled = true;

    billAmountValue = "0.00";
    numberOfPeopleValue = 0;
    tipSelected = false;
    tipValue = 0;

    billAmount.value = billAmountValue;
    numberOfPeople.value = numberOfPeopleValue;

    tipAmountValue = 0.00;
    totalAmountValue = 0.00;

    tipAmount.innerText = "$" + tipAmountValue.toFixed(2);
    totalAmount.innerText = "$" + totalAmountValue.toFixed(2);

    makeTipButtonsInactive();
    resetCustomButton();

}

function makeResetButtonActive() {
    resetButton.disabled = false;

    resetButton.classList.add('reset-button-active');
}

function resetCustomButton() {
    buttonCustom.classList.remove("hide");
    buttonCustomInput.classList.add("hide");
}

function canTipBeCalculated () {
    if (billAmountValue > 0 && tipSelected) {
        if(numberOfPeopleValue > 0) {    
            hideNumberofPeopleError();
            calculateTip();
        } else {
            showNumberofPeopleError();
        }
    }
}

function calculateTip() {

    tipAmountValue = (billAmountValue * (tipValue/100)) / numberOfPeopleValue;
    totalAmountValue = ((billAmountValue * (tipValue/100)) + parseFloat(billAmountValue)) / numberOfPeopleValue;

    tipAmount.innerText = "$" + tipAmountValue.toFixed(2);
    totalAmount.innerText = "$" + totalAmountValue.toFixed(2);

}

function makeTipButtonsInactive() {
    tipButtons.forEach(function(btn) {
        btn.classList.remove("grid-button-pressed");
    })
}

function showNumberofPeopleError() {
    numberOfPeopleError.classList.remove("hide");
    numberOfPeople.classList.add("red-border");

}

function hideNumberofPeopleError() {
    numberOfPeopleError.classList.add("hide");
    numberOfPeople.classList.remove("red-border");
}


document.addEventListener('DOMContentLoaded', () => {
    resetValues();
});


billAmount.addEventListener('focus', function() {
    billAmount.select();
    makeResetButtonActive();
});

billAmount.addEventListener('input', function() {

    const twoDecimalPlaces = /^\d*\.?\d{0,2}$/;


    if (twoDecimalPlaces.test(this.value)) {
        billAmountValue = this.value;
        canTipBeCalculated();
    } else {
        this.value = billAmountValue;
    }

});

billAmount.addEventListener('blur', function(){
    this.value = parseFloat(this.value).toFixed(2);
});


numberOfPeople.addEventListener('focus', function() {
    numberOfPeople.select();
    makeResetButtonActive();
});

numberOfPeople.addEventListener('input', function(event) {

    const numbersOnly = /^[0-9]+$/;

    if (numbersOnly.test(this.value)) {
        numberOfPeopleValue = this.value;
        canTipBeCalculated();
    } else {
        this.value = numberOfPeopleValue;
    }
    
});


tipButtons.forEach(function(button) {
    button.addEventListener('click', function() {

        resetCustomButton();
        makeResetButtonActive();

        tipButtons.forEach(function(btn) {
            if (btn !== button) {
                btn.classList.remove("grid-button-pressed");
            } else {
                btn.classList.add("grid-button-pressed");
            }

        });

        switch(button.id) {
            case "tip5": 
                tipValue = 5;
                break;
            case "tip10":
                tipValue = 10;
                break;
            case "tip15":
                tipValue = 15;
                break;
            case "tip25":
                tipValue = 25;
                break;
            case "tip50":
                tipValue = 50;
                break;
        }

        tipSelected = true;
        canTipBeCalculated();
    });
});


buttonCustom.addEventListener('click', function() {

    makeTipButtonsInactive();
    makeResetButtonActive();

    tipSelected = true;

    buttonCustom.classList.add("hide");
    buttonCustomInput.classList.remove("hide");
    
    buttonCustomInput.value = "0";
    buttonCustomInput.select();
    tipValue = this.value;
    canTipBeCalculated();
})

buttonCustomInput.addEventListener('focus', function() {
    buttonCustomInput.select();
});

buttonCustomInput.addEventListener('input', function() {


    const numbersOnly = /^[0-9]+$/;

    if (numbersOnly.test(this.value)) {
        tipSelected = true;
        tipValue = this.value;
        canTipBeCalculated();
    } else {
        this.value = tipValue;
    }

});

resetButton.addEventListener('click', function() {
    resetValues();
});




