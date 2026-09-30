/* =========================================
   LOADER
========================================= */

window.addEventListener("load",function(){

    setTimeout(function(){

        document
        .getElementById("loader")
        .classList
        .add("hide");

    },900);

});


/* =========================================
   INTRO → ENVELOPE
========================================= */

document
.getElementById("goEnvelope")
.addEventListener("click",function(){

    document
    .getElementById("envelopeSection")
    .scrollIntoView({
        behavior:"smooth"
    });

});


/* =========================================
   ENVELOPE
========================================= */

const envelope =
document.getElementById("envelope");

const music =
document.getElementById("birthdayMusic");

let envelopeOpened=false;

envelope.addEventListener("click",async function(){

    if(envelopeOpened)return;

    envelopeOpened=true;


    /* OPEN ENVELOPE */

    envelope.classList.add("open");


    /* MUSIC START */

    try{

        await music.play();

        document
        .getElementById("musicButton")
        .innerHTML="❚❚";

    }

    catch(error){

        console.log(
            "Music couldn't autoplay."
        );

    }


    /* CONFETTI */

    createConfetti(70);


    /*
       WAIT FOR ENVELOPE ANIMATION
       THEN REVEAL BIRTHDAY
    */

    setTimeout(function(){

        document
        .getElementById("birthdayReveal")
        .scrollIntoView({
            behavior:"smooth"
        });

    },1300);


    /*
       AFTER BIRTHDAY REVEAL,
       AUTOMATICALLY SHOW MESSAGE
    */

    setTimeout(function(){

        document
        .getElementById("messageSection")
        .scrollIntoView({
            behavior:"smooth"
        });

    },5200);

});


/* =========================================
   MUSIC BUTTON
========================================= */

let musicPlaying=true;

document
.getElementById("musicButton")
.addEventListener("click",async function(){

    if(music.paused){

        try{

            await music.play();

            this.innerHTML="❚❚";

            musicPlaying=true;

        }

        catch(error){

            alert(
                "birthday.mp3 ko same folder mein rakho."
            );

        }

    }

    else{

        music.pause();

        this.innerHTML="♪";

        musicPlaying=false;

    }

});


/* =========================================
   MESSAGE ANIMATION
========================================= */

const paragraphs =
document.querySelectorAll(
".animated-paragraph"
);


const messageObserver =
new IntersectionObserver(
function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            const index =
            [...paragraphs]
            .indexOf(entry.target);


            setTimeout(function(){

                entry.target
                .classList
                .add("show");

            },index*350);


            messageObserver
            .unobserve(entry.target);

        }

    });

},
{
    threshold:.12
});


paragraphs.forEach(function(item){

    messageObserver.observe(item);

});


/* =========================================
   PHOTO ANIMATION
========================================= */

const photoCards =
document.querySelectorAll(".photo-card");


const photoObserver =
new IntersectionObserver(
function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target
            .classList
            .add("show");

            photoObserver
            .unobserve(entry.target);

        }

    });

},
{
    threshold:.15
});


photoCards.forEach(function(card){

    photoObserver.observe(card);

});


/* =========================================
   SCRATCH CARD
========================================= */

const canvas =
document.getElementById("scratchCanvas");

const ctx =
canvas.getContext("2d");

let scratching=false;

let scratchDone=false;


function setupCanvas(){

    const rect =
    canvas.getBoundingClientRect();

    const dpr =
    window.devicePixelRatio || 1;


    canvas.width =
    rect.width*dpr;

    canvas.height =
    rect.height*dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    const gradient =
    ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
    );


    gradient.addColorStop(
        0,
        "#e63d60"
    );

    gradient.addColorStop(
        .5,
        "#c7193f"
    );

    gradient.addColorStop(
        1,
        "#920f2c"
    );


    ctx.fillStyle=gradient;

    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    ctx.textAlign="center";

    ctx.fillStyle="white";

    ctx.font=
    "600 15px Poppins";


    ctx.fillText(
        "SCRATCH HERE ✨",
        rect.width/2,
        rect.height/2
    );


    ctx.font=
    "11px Poppins";


    ctx.fillStyle=
    "rgba(255,255,255,.7)";


    ctx.fillText(
        "there's something waiting...",
        rect.width/2,
        rect.height/2+25
    );

}


setupCanvas();

window.addEventListener(
"resize",
setupCanvas
);


/* GET MOUSE / TOUCH POSITION */

function getPosition(event){

    const rect =
    canvas.getBoundingClientRect();


    const point =
    event.touches
    ?
    event.touches[0]
    :
    event;


    return{

        x:
        point.clientX-
        rect.left,

        y:
        point.clientY-
        rect.top

    };

}


/* SCRATCH */

function scratch(event){

    if(!scratching)return;

    if(scratchDone)return;


    const position =
    getPosition(event);


    ctx.globalCompositeOperation =
    "destination-out";


    ctx.beginPath();


    ctx.arc(
        position.x,
        position.y,
        25,
        0,
        Math.PI*2
    );


    ctx.fill();


    calculateScratch();

}


/* MOUSE */

canvas.addEventListener(
"mousedown",
function(event){

    scratching=true;

    scratch(event);

});


canvas.addEventListener(
"mousemove",
scratch
);


window.addEventListener(
"mouseup",
function(){

    scratching=false;

});


/* TOUCH */

canvas.addEventListener(
"touchstart",
function(event){

    scratching=true;

    scratch(event);

},
{
    passive:true
});


canvas.addEventListener(
"touchmove",
scratch,
{
    passive:true
});


window.addEventListener(
"touchend",
function(){

    scratching=false;

});


/* CHECK SCRATCH */

function calculateScratch(){

    const pixels =
    ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    ).data;


    let clear=0;


    for(
        let i=3;
        i<pixels.length;
        i+=4
    ){

        if(pixels[i]<80){

            clear++;

        }

    }


    const percentage =
    clear/
    (pixels.length/4)
    *100;


    document
    .getElementById("progress")
    .style.width =
    Math.min(
        percentage,
        100
    )+"%";


    if(
        percentage>55 &&
        !scratchDone
    ){

        scratchDone=true;


        canvas.style.transition=
        "opacity 1s";


        canvas.style.opacity="0";


        createConfetti(90);

    }

}


/* =========================================
   GIFT
========================================= */

const gift =
document.getElementById("gift");

const giftMessage =
document.getElementById("giftMessage");

let giftOpened=false;


function openGift(){

    if(giftOpened)return;

    giftOpened=true;


    gift.classList.add("open");


    setTimeout(function(){

        giftMessage
        .classList
        .add("show");


        createConfetti(100);

    },700);

}


gift.addEventListener(
"click",
openGift
);


document
.getElementById("openGift")
.addEventListener(
"click",
openGift
);


/* =========================================
   FLOATING HEARTS
========================================= */

setInterval(function(){

    const heart =
    document.createElement("div");


    heart.className=
    "floating-heart";


    const types=[
        "♥",
        "♡",
        "❤",
        "💗",
        "💕"
    ];


    heart.innerHTML =
    types[
        Math.floor(
            Math.random()*
            types.length
        )
    ];


    heart.style.left =
    Math.random()*100+"vw";


    heart.style.fontSize =
    (
        12+
        Math.random()*20
    )+"px";


    heart.style.animationDuration =
    (
        5+
        Math.random()*5
    )+"s";


    document
    .getElementById("floatingHearts")
    .appendChild(heart);


    setTimeout(function(){

        heart.remove();

    },10000);


},850);


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount){

    const colors=[
        "#c7193f",
        "#ffffff",
        "#ef5575",
        "#8f0e2d",
        "#ffd4dc"
    ];


    for(
        let i=0;
        i<amount;
        i++
    ){

        const piece =
        document.createElement("div");


        piece.className=
        "confetti";


        piece.style.left =
        Math.random()*100+"vw";


        piece.style.background =
        colors[
            Math.floor(
                Math.random()*
                colors.length
            )
        ];


        piece.style.width =
        (
            5+
            Math.random()*6
        )+"px";


        piece.style.height =
        (
            8+
            Math.random()*7
        )+"px";


        piece.style.animationDuration =
        (
            2.5+
            Math.random()*3
        )+"s";


        piece.style.animationDelay =
        Math.random()+".5s";


        document
        .body
        .appendChild(piece);


        setTimeout(function(){

            piece.remove();

        },6000);

    }

}