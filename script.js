/*=========================================
 FUTURE AI v2
 Premium JavaScript
=========================================*/

// ================================
// LOADER
// ================================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

loader.style.visibility = "hidden";

},1200);

});

// ================================
// AI TOOLS DATABASE
// ================================

const aiTools=[

{
name:"ChatGPT",
category:"Text",
icon:"🤖",
tagline:"AI Assistant",
link:"https://chatgpt.com"
},

{
name:"Claude",
category:"Text",
icon:"🧠",
tagline:"AI Chat",
link:"https://claude.ai"
},

{
name:"Gemini",
category:"Text",
icon:"💎",
tagline:"Google AI",
link:"https://gemini.google.com"
},

{
name:"Copilot",
category:"Coding",
icon:"💻",
tagline:"Coding Assistant",
link:"https://github.com/features/copilot"
},

{
name:"DeepSeek",
category:"Text",
icon:"🚀",
tagline:"AI Search",
link:"https://www.deepseek.com"
},

{
name:"Midjourney",
category:"Image",
icon:"🎨",
tagline:"AI Art",
link:"https://www.midjourney.com"
},

{
name:"Leonardo AI",
category:"Image",
icon:"🖼️",
tagline:"Image Generator",
link:"https://leonardo.ai"
},

{
name:"Runway",
category:"Video",
icon:"🎬",
tagline:"Video AI",
link:"https://runwayml.com"
},

{
name:"Pika",
category:"Video",
icon:"📹",
tagline:"AI Video",
link:"https://pika.art"
},

{
name:"ElevenLabs",
category:"Voice",
icon:"🎙️",
tagline:"Voice AI",
link:"https://elevenlabs.io"
},

{
name:"Suno",
category:"Voice",
icon:"🎵",
tagline:"Music AI",
link:"https://suno.com"
},

{
name:"Perplexity",
category:"Productivity",
icon:"🔍",
tagline:"AI Search",
link:"https://www.perplexity.ai"
}

];

// ================================
// GENERATE TOOL CARDS
// ================================

const grid=document.getElementById("toolsGrid");

function loadTools(data){

grid.innerHTML="";

data.forEach(tool=>{

grid.innerHTML+=`

<div class="tool-card">

<div class="tool-icon">

${tool.icon}

</div>

<h3>${tool.name}</h3>

<p>${tool.tagline}</p>

<a href="${tool.link}" target="_blank">

Explore

</a>

</div>

`;

});

}

loadTools(aiTools);
// ===================================
// LIVE SEARCH
// ===================================

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value = searchInput.value.toLowerCase();

const filtered = aiTools.filter(tool =>

tool.name.toLowerCase().includes(value) ||

tool.category.toLowerCase().includes(value) ||

tool.tagline.toLowerCase().includes(value)

);

loadTools(filtered);

enableTilt();

});

}

// ===================================
// CATEGORY FILTER
// ===================================

const buttons=document.querySelectorAll(".categories button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category=button.innerText;

if(category==="All"){

loadTools(aiTools);

}

else{

loadTools(

aiTools.filter(tool=>tool.category===category)

);

}

enableTilt();

});

});

// ===================================
// VANILLA TILT
// ===================================

function enableTilt(){

VanillaTilt.init(

document.querySelectorAll(".tool-card"),

{

max:15,

speed:500,

scale:1.05,

glare:true,

"max-glare":0.3

}

);

}

enableTilt();

// ===================================
// COUNTER ANIMATION
// ===================================

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText;

const increment=Math.ceil(target/120);

if(current<target){

counter.innerText=current+increment;

requestAnimationFrame(update);

}else{

counter.innerText=target.toLocaleString()+"+";

}

};

update();

});

// ===================================
// GSAP HERO ANIMATION
// ===================================

gsap.from(".hero-content h1",{

opacity:0,

y:80,

duration:1.2

});

gsap.from(".hero-content p",{

opacity:0,

y:50,

delay:.3,

duration:1

});

gsap.from(".hero-buttons",{

opacity:0,

y:40,

delay:.6,

duration:1

});
/*==================================
 FUTURE AI v2
 Final Effects
==================================*/

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(5,8,22,.85)";
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";

    } else {

        navbar.style.background = "rgba(255,255,255,.05)";
        navbar.style.boxShadow = "none";

    }

});

// ===============================
// THREE.JS HERO
// ===============================

const canvas = document.getElementById("heroCanvas");

if(canvas){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
canvas.clientWidth/canvas.clientHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({

canvas:canvas,
alpha:true,
antialias:true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

canvas.clientWidth,
canvas.clientHeight

);

const geometry = new THREE.IcosahedronGeometry(2,2);

const material = new THREE.MeshStandardMaterial({

color:0x00E5FF,

wireframe:true,

emissive:0x00E5FF,

emissiveIntensity:.5

});

const sphere = new THREE.Mesh(

geometry,
material

);

scene.add(sphere);

const light = new THREE.PointLight(

0xffffff,

2

);

light.position.set(5,5,5);

scene.add(light);

camera.position.z = 5;

function animate(){

requestAnimationFrame(animate);

sphere.rotation.x += .003;

sphere.rotation.y += .004;

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect =

canvas.clientWidth /
canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(

canvas.clientWidth,
canvas.clientHeight

);

});

}

// ===============================
// SCROLL ANIMATION
// ===============================

gsap.utils.toArray(

".tool-card,.featured,.stat-card,.newsletter"

).forEach(item=>{

gsap.from(item,{

scrollTrigger:{

trigger:item,

start:"top 85%"

},

opacity:0,

y:80,

duration:.9

});

});

// ===============================
// SMOOTH ANCHOR SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]')

.forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target =

document.querySelector(

this.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===============================
// VIDEO PLAYBACK
// ===============================

const heroVideo =

document.querySelector(".hero-video");

if(heroVideo){

heroVideo.play().catch(()=>{});

}

// ===============================
// CONSOLE
// ===============================

console.log("🚀 Future AI v2 Loaded Successfully");
// ==============================
// CUSTOM CURSOR
// ==============================

const cursor=document.querySelector(".cursor");

const blur=document.querySelector(".cursor-blur");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

blur.style.left=e.clientX+"px";

blur.style.top=e.clientY+"px";

});

// ==============================
// PARTICLE BACKGROUND
// ==============================

const canvas=document.getElementById("particles");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

const particles=[];

for(let i=0;i<80;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

dx:(Math.random()-0.5)*0.6,

dy:(Math.random()-0.5)*0.6

});

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00E5FF";

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fill();

p.x+=p.dx;

p.y+=p.dy;

if(p.x<0||p.x>canvas.width)p.dx*=-1;

if(p.y<0||p.y>canvas.height)p.dy*=-1;

});

requestAnimationFrame(animateParticles);

}

animateParticles();

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

});