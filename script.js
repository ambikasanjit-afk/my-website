/*=====================================
 FUTURE AI
 Premium JavaScript
/*=============================
 GSAP ANIMATIONS
=============================*/

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero h1",{

y:100,

opacity:0,

duration:1.2

});

gsap.from(".hero p",{

y:80,

opacity:0,

delay:.3,

duration:1

});

gsap.from(".hero-buttons",{

y:60,

opacity:0,

delay:.6,

duration:1

});


/*=============================
 3D CARD EFFECT
=============================*/

VanillaTilt.init(document.querySelectorAll(".tool-card"),{

max:18,

speed:400,

glare:true,

"max-glare":0.35,

scale:1.05

});
=====================================*/

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({

behavior:"smooth"

});

});

});


// Cursor Glow

const glow=document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});


// Navbar Blur on Scroll

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

navbar.style.background="rgba(5,8,22,.75)";

navbar.style.backdropFilter="blur(25px)";

}

else{

navbar.style.background="rgba(255,255,255,.05)";

}

});


// Hero Fade

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

hero.style.opacity=1-window.scrollY/700;

hero.style.transform=`translateY(${window.scrollY*0.25}px)`;

});


// Reveal Animation

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".hidden").forEach(el=>{

observer.observe(el);

});