function searchTools() {

    let input = document.getElementById("search").value.toLowerCase();

    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {

        let title = cards[i].getElementsByTagName("h3")[0];

        if (title) {

            let text = title.innerText.toLowerCase();

            if (text.indexOf(input) > -1) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }

        }
    }
}
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = "🌞 Light Mode";
    } else {
        themeToggle.innerHTML = "🌙 Dark Mode";
    }
});