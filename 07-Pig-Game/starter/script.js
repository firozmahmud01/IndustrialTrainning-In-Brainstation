'use strict';
let score={
    current:0,
    score:0,
    hold(){
        this.score+=this.current;
        this.current=0;
        return this.score;
    },
    roll(){
        let ran=Math.trunc(Math.random()*6+1)
        
        if(ran==1){
            this.current=0;
            return 1;
        }
        this.current+=ran;
        return ran;
    }
}
let player=[{...score},{...score}];


let active=0;

function rollaction(){
    let c=player[active].roll();
    let tcu=document.getElementById('current--'+active);
    tcu.innerText=player[active].current;
    document.getElementById('dice').src="dice-"+c+'.png';
    if(c==1){
        
        let pl=document.getElementById('player'+active);
        pl.classList.toggle('player--active');
        active=active==0?1:0;
        pl=document.getElementById('player'+active);
        pl.classList.toggle('player--active');
    }
}
function holdaction(){
    let tcu=document.getElementById('current--'+active);
    tcu.innerText=0;
    let c=player[active].hold();
    let pl=document.getElementById('player'+active);
    pl.classList.toggle('player--active');
    
    let sco=document.getElementById('score--'+active);
    sco.innerText=player[active].score;
    if(c>=100){
        pl.classList.add('player--winner');
        return;
    }    
        active=active==0?1:0;
        pl=document.getElementById('player'+active);
        pl.classList.toggle('player--active');
}
function newgameaction(){
active=0;
let pl0=document.getElementById('player0');
let pl1=document.getElementById('player1');
document.getElementById('score--0').innerText=0;
document.getElementById('score--1').innerText=0;
if(pl1.classList.contains('player--winner'))pl1.classList.remove('player--winner');
if(pl0.classList.contains('player--winner'))pl0.classList.remove('player--winner');
if(pl1.classList.contains('player--active'))pl1.classList.remove('player--active');
pl0.classList.add('player--active')
player[0].score=0;
player[1].score=0;
player[0].current=0;
player[1].current=0;


}
newgameaction();