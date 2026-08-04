/*======================================
 FUTURE AI
 Premium JavaScript
======================================*/

// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

loader.style.visibility = "hidden";

},1200);

});

// ===============================
// AI TOOLS DATABASE
// ===============================

const tools=[

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
tagline:"Smart AI Chat",
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
tagline:"Create Videos",
link:"https://pika.art"
},

{
name:"ElevenLabs",
category:"Voice",
icon:"🎙️",
tagline:"AI Voice",
link:"https://elevenlabs.io"
},

{
name:"Suno",
category:"Voice",
icon:"🎵",
tagline:"Music Generator",
link:"https://suno.com"
},

{
name:"Perplexity",
category:"Productivity",
icon:"🔍",
tagline:"AI Search",
link:"https://www.perplexity.ai"
},

{
name:"Notion AI",
category:"Productivity",
icon:"📒",
tagline:"Notes AI",
link:"https://www.notion.so/product/ai"
}

];

// ===============================
// GENERATE TOOL CARDS
// ===============================

const toolsGrid=document.getElementById("toolsGrid");

function displayTools(data){

toolsGrid.innerHTML="";

data.forEach(tool=>{

toolsGrid.innerHTML+=`

<div class="tool-card">

<div class="tool-icon">

${tool.icon}

</div>

<h3>

${tool.name}

</h3>

<p>

${tool.tagline}

</p>

<a href="${tool.link}" target="_blank">

Explore

</a>

</div>

`;

});

}

displayTools(tools);
// ===============================
// SEARCH
// ===============================

const searchInput=document.getElementById("searchInput");

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const filtered=tools.filter(tool=>

tool.name.toLowerCase().includes(value)||

tool.category.toLowerCase().includes(value)

);

displayTools(filtered);

initTilt();

});

// ===============================
// CATEGORY FILTER
// ===============================

const buttons=document.querySelectorAll(".categories button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category=button.innerText;

if(category==="All"){

displayTools(tools);

}

else{

displayTools(

tools.filter(tool=>tool.category===category)

);

}

initTilt();

});

});

// ===============================
// VANILLA TILT
// ===============================

function initTilt(){

VanillaTilt.init(

document.querySelectorAll(".tool-card"),

{

max:15,

speed:400,

glare:true,

"max-glare":0.3,

scale:1.04

}

);

}

initTilt();

// ===============================
// COUNTERS
// ===============================

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText;

const increment=target/120;

if(current<target){

counter.innerText=Math.ceil(current+increment);

requestAnimationFrame(update);

}

else{

counter.innerText=target.toLocaleString()+"+";

}

};

update();

});
// ===============================
// GSAP ANIMATIONS
// ===============================

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-left h1",{
    y:100,
    opacity:0,
    duration:1.2
});

gsap.from(".hero-left p",{
    y:80,
    opacity:0,
    delay:0.3,
    duration:1
});

gsap.from(".hero-buttons",{
    y:60,
    opacity:0,
    delay:0.6,
    duration:1
});

gsap.utils.toArray(".tool-card").forEach(card=>{

    gsap.from(card,{
        scrollTrigger:{
            trigger:card,
            start:"top 85%"
        },
        opacity:0,
        y:80,
        duration:0.8
    });

});

// ===============================
// NAVBAR EFFECT
// ===============================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

navbar.style.background="rgba(4,7,15,.85)";
navbar.style.backdropFilter="blur(25px)";

}else{

navbar.style.background="rgba(255,255,255,.05)";

}

});

// ===============================
// THREE.JS HERO
// ===============================

const canvas=document.getElementById("hero-canvas");

if(canvas){

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
canvas.clientWidth/canvas.clientHeight,
0.1,
1000
);

const renderer=new THREE.WebGLRenderer({
canvas,
alpha:true,
antialias:true
});

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

const geometry=new THREE.IcosahedronGeometry(2,1);

const material=new THREE.MeshStandardMaterial({

color:0x00e5ff,

wireframe:true

});

const mesh=new THREE.Mesh(
geometry,
material
);

scene.add(mesh);

const light=new THREE.PointLight(
0xffffff,
2
);

light.position.set(5,5,5);

scene.add(light);

camera.position.z=5;

function animate(){

requestAnimationFrame(animate);

mesh.rotation.x+=0.003;

mesh.rotation.y+=0.004;

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=
canvas.clientWidth/canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

});

}

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

document.querySelector