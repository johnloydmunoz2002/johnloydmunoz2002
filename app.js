document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to quantity inputs
    var quantities = document.querySelectorAll('[id^="qty"]');
    var cashInput = document.getElementById("cash");

    quantities.forEach(function(input) {
        input.addEventListener('input', function() {
            updateOrder();
        });
    });

    cashInput.addEventListener('input', function() {
        calculateChange();
    });

    function updateOrder() {
        var carts = document.getElementById("carts");
        carts.value = ""; // Clear carts textarea

        // Define prices for each product
        var prices = {
            "qty1": 300.00,
            "qty2": 200.00,
            "qty3": 250.00,
            "qty4": 270.00,
            "qty5": 290.00,
            "qty6": 270.00
        };

        var total = 0;

        // Iterate through each quantity input to generate the order list
        for (let i = 1; i <= 6; i++) {
            var qtyInput = document.getElementById("qty" + i);
            if (!qtyInput) continue;
            var productTitle = qtyInput.closest(".card-body").querySelector(".card-title").innerText;
            var productPrice = prices["qty" + i];

            if (qtyInput.value > 0) {
                var order = `${qtyInput.value} pcs x ${productTitle} - ₱${(qtyInput.value * productPrice).toFixed(2)}\n`;
                carts.value += order;
                total += qtyInput.value * productPrice;
            }
        }

        // Update total input
        document.getElementById("total").value = total.toFixed(2);
        calculateChange(); // Recalculate change if cash input is present
    }

    function calculateChange() {
        var total = parseFloat(document.getElementById("total").value);
        var cash = parseFloat(document.getElementById("cash").value);
        var change = cash - total;

        // Ensure change is not NaN
        if (isNaN(change)) {
            document.getElementById("change").value = "";
        } else {
            document.getElementById("change").value = change.toFixed(2);
        }
    }
});

