window.addEventListener('load' , () => {
    const swapButtons = document.querySelectorAll('button.search-type-swap');
    const searchPanel = document.getElementById('search-panel');

    swapButtons.forEach((button) => {
        button.addEventListener('click', e => {
            e.preventDefault();

            const searchType = button.getAttribute('data-swap-to');
            searchPanel.setAttribute('data-search-type', searchType);
        });
    });
});

function htmxFormDisableSubmitButton(form) {
    form.querySelector("button[type='submit']").disabled = true;
}

function htmxFormEnableSubmitButton(form) {
    form.querySelector("button[type='submit']").disabled = false;
}

function onIpInputInvalid(input) {
    input.setCustomValidity('Please enter a valid IP address')
}

function resetIpValidity(input) {
    input.setCustomValidity('');
}
