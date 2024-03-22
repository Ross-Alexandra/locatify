function onIpInputInvalid(input) {
    input.setCustomValidity('Please enter a valid IP address');
}

function resetIpValidity(input) {
    input.setCustomValidity('');
}
