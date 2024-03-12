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

function onIpInputInvalid(input) {
    input.setCustomValidity('Please enter a valid IP address');
}

function resetIpValidity(input) {
    input.setCustomValidity('');
}
