/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 1200);
});

/* ==========================
   DARK MODE
========================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.innerHTML = "☀";
    }else{
        themeToggle.innerHTML = "🌙";
    }

});

/* ==========================
   SEARCH
========================== */

function searchTools(){

    let input = document.getElementById("searchInput").value.toLowerCase();

    let cards = document.querySelectorAll(".tool-card");

    cards.forEach(card=>{

        let text = card.innerText.toLowerCase();

        if(text.includes(input)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

}

/* ==========================
   BACK TO TOP
========================== */

const topBtn=document.getElementById("topBtn");

window.onscroll=function(){

    if(document.body.scrollTop>300 || document.documentElement.scrollTop>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

};

function topFunction(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
/* ==========================
   CATEGORY FILTER
========================== */

function filterTools(category){

    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card=>{

        if(category==="all"){
            card.style.display="block";
        }
        else if(card.classList.contains(category)){
            card.style.display="block";
        }
        else{
            card.style.display="none";
        }

    });

}

/* ==========================
   TOOL DETAILS MODAL
========================== */

const modal = document.getElementById("toolModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");

function openModal(title, description, link){

    modalTitle.innerText = title;
    modalDescription.innerText = description;
    modalLink.href = link;

    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

window.addEventListener("click",(e)=>{
    if(e.target===modal){
        closeModal();
    }
});

/* ==========================
   SCROLL ANIMATION
========================== */

const cards = document.querySelectorAll(".tool-card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition="0.6s";

    observer.observe(card);

});

/* ==========================
   FAVORITES (LOCAL STORAGE)
========================== */

document.querySelectorAll(".fav-btn").forEach((btn, index) => {

    const key = "favorite_" + index;

    if (localStorage.getItem(key) === "true") {
        btn.innerHTML = "❤️";
    }

    btn.addEventListener("click", () => {

        if (btn.innerHTML === "🤍") {
            btn.innerHTML = "❤️";
            localStorage.setItem(key, "true");
        } else {
            btn.innerHTML = "🤍";
            localStorage.setItem(key, "false");
        }

    });

});
/* ==========================
   MOBILE MENU
========================== */

function toggleMenu(){

    document
        .getElementById("navbar")
        .classList
        .toggle("show");

}