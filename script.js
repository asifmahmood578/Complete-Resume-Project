var navmenuAnchortags=document.querySelectorAll('.nav-menu a');
var interval
for(var i=0;i<navmenuAnchortags.length;i++){
    navmenuAnchortags[i].addEventListener('click', function(event){
        event.preventDefault();
        var targetsectionID=this.textContent.trim().toLowerCase();
        var targetsection=document.getElementById(targetsectionID);
        interval =setInterval(scrollvertically,20,targetsection);
    });
}

function scrollvertically(targetsection){
    var targetsectionCoordinates = targetsection.getBoundingClientRect();
    if(targetsectionCoordinates.top<=0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,50);
}


// check whether the skill-container is visible or not
// when the bar is visible then it should full its width
// ensured that the initial width of progress bar should be zero
// start animation on every skill progress bar => from 0 to its skill percent
// store skill level in html with data attribute

var progressbar=document.querySelectorAll('.skills-progress > div');


for(var bar of progressbar){
    initiliazebar(bar);
}

function initiliazebar(bar){
    bar.setAttribute("data-visited",false);
    bar.style.width= 0 + '%';
}

function fillbar(bar){
    var currentwidth=0;
    var targetwidth=bar.getAttribute("data-bar-width");
    var interval=setInterval(function(){
        if(currentwidth>=targetwidth){
            clearInterval(interval);
            return;
        }
        currentwidth++;
        bar.style.width=currentwidth + '%';
    },5);
}

function checkscroll(){
    for(let bar of progressbar){
        var barCordinates=bar.getBoundingClientRect();
        if((bar.getAttribute('data-visited')=="false") && barCordinates.top<=(window.innerHeight-barCordinates.height)){
                bar.setAttribute('data-visited',true);
                fillbar(bar);
        }
        else if(barCordinates.top>=window.innerHeight){
                bar.setAttribute('data-vivited', false);
                initiliazebar(bar);
        }
    }
}

window.addEventListener('scroll',checkscroll);



// This event fills the progress bars if they are displayed on the screen when the page is loaded.
//window.addEventListener("load", checkScroll);


// % view of how much screen has scroll in the top

var scrollview=document.getElementById('scroll-id');

// Find the maximum height of the screen by making function
function getHeight(){
    return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight);
}

//store height in some function
var docheight=getHeight();
var windowheight=window.innerHeight;

// Now reset useing onresize property when user change the dimension of the page then screen size may increase or decrease;

window.onresize=function(){
    docheight=getHeight();
    windowheight=window.innerHeight;
}

function checkPercentageScroll(){
    var scrolled=Math.floor((window.scrollY)/(docheight-windowheight)*100);
    scrollview.innerText=scrolled;
}

window.addEventListener('scroll', checkPercentageScroll);