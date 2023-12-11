window.onload = function () {
    // Get the input and buttons
    const quantityInput = document.getElementById("quantity");
    const decrementButton = document.getElementById("decrement");
    const incrementButton = document.getElementById("increment");

    // Decrement button click event
    decrementButton.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Increment button click event
    incrementButton.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
    });
};