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
document.querySelectorAll(".fav-btn").forEach(button => {

button.addEventListener("click", function(){

if(this.innerHTML==="🤍"){
this.innerHTML="❤️";
}else{
this.innerHTML="🤍";
}

});

});
function filterTools(category) {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (category === "all") {
            card.style.display = "";
        } else if (card.dataset.category === category) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    updateToolCount();
}
function updateToolCount() {
    const visibleCards = document.querySelectorAll(
        ".card[style=''], .card:not([style]), .card[style='display: block;']"
    );

    document.getElementById("toolCount").innerHTML =
        "Showing " + visibleCards.length + " AI Tools";
}

window.onload = function () {
    updateToolCount();
};
updateToolCount();
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1500);
});
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}