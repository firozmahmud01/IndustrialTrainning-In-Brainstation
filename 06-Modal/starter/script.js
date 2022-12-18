'use strict';

function showmodal(){
    let win=document.getElementById("modalwindow");
    let overlay=document.getElementById('overlay');
    win.classList.toggle('hidden');
    overlay.classList.toggle('hidden');

}