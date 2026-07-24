function searchTools() {
    const input = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card.querySelector("h3")
            ? card.querySelector("h3").innerText.toLowerCase()
            : "";

        const text = card.innerText.toLowerCase();

        if (title.includes(input) || text.includes(input)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Welcome message
window.onload = function () {
    console.log("Welcome to AI Genie Pro 🚀");
};