'use strict';

const guess=document.getElementById('guess');
const input=document.getElementById('input');
const message=document.getElementById('message');
const score=document.getElementById("score");
const highscore=document.getElementById("highscore");
let guessnumber=Math.floor(Math.random() * 20);
let highest=0;
let current=20;
const body=document.body
score.innerText=current;
body.style.backgroundColor="red"
function againaction(){
    guess.innerText="?";
    guessnumber=Math.floor(Math.random() * 20);
    current=20;
    body.style.backgroundColor="red"
    message.innerText="";
    score.innerText=current;
}



function checkaction(){

    let val=input.value;
    if(val<guessnumber){
        message.innerText="Too low";
        current--;
        body.style.backgroundColor="red"
        score.innerText=""+current;
    }else if(val>guessnumber){
        current--;
        body.style.backgroundColor="red"
        score.innerText=""+current;
        message.innerText="Too high";
    }else{
        message.innerText="Currect answer";
        guess.innerText=""+guessnumber;
        body.style.backgroundColor="green"
        if(current>highest){
            highest=current;
            highscore.innerText=""+highest;
        }
    }

}