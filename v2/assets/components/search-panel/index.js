window.addEventListener('load' , () => {
    const swapButtons = document.querySelectorAll('button.search-type-swap');
    const searchPanel = document.getElementById('search-panel');
    console.log(swapButtons);

    swapButtons.forEach((button) => {
        button.addEventListener('click', e => {
            e.preventDefault();

            const searchType = e.target.getAttribute('data-swap-to');
            searchPanel.setAttribute('data-search-type', searchType);
        });
    });
});
