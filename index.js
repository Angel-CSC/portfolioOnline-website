/*
This website will be used to display and categorized the works that I have worked on, so that -
in accordance to my skills - I get and attain new experiences and work that will increase my
standing professionally
*/

function typeWriter(){
    if(i < txt.length){
        document.getElementById("explainWebsite").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');
const reachOut = document.querySelector(".button");

var i = 0;
var txt = "Welcome to my portfolio! My name is Angel Gomez and I am persuing a career in Software Engineering. I am a Freshman at the University of Texas at Dallas; but I am a junior credit-wise. In this portfolio, you will find examples of my work and achievements, as well as information about my background and education. I am passionate about connectiong with people and finding intersection in passions, and am always seeking new opportunities to learn and grow. Thank you for taking the time to review my portfolio. I hope you enjoy learning more about me and my work :)";
var speed = 20;

typeWriter(); //this will make the animation where the text is applied on the screen!!!!!




//from here onwards: this will be reading any actions that the users make
//and
menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

reachOut.addEventListener('click', function(){
    
});

