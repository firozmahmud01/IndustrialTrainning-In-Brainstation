'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let data=[]
const form = document.querySelector('.form');
form.addEventListener('submit',submitform)

const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
inputType.addEventListener('change',(e)=>{
    
        inputCadence.parentElement.classList.toggle('form__row--hidden');
        inputElevation.parentElement.classList.toggle('form__row--hidden');
    
    
})
let map;
class Work{

    constructor(coords,distance,duration,step,type){
        this.coords=coords;
        this.date=new Date()
        this.type=type;
        this.id=Date.now();
        this.distance=distance;
        this.duration=duration;
        this.step=step;
        this.description = `${this.type.toUpperCase()} on ${
            months[this.date.getMonth()]}`;
        this.calculatespeed()
    }
    calculatespeed(){
        this.speed=this.distance / (this.duration / 60);
    }


}

function clearform(){
    inputCadence.value='';
    inputDistance.value='';
    inputDuration.value='';
    inputElevation.value='';
    form.classList.add('hidden')
}
function submitform(e){
    e.preventDefault()
    const type = inputType.value;
    if(inputDistance=='')return;
    const distance = +inputDistance.value;

    const duration = +inputDuration.value;
    
    const d=new Work(
        [sessionStorage.getItem('curlat'),
        sessionStorage.getItem('curlong')],distance,duration,
        (type=='running'?inputCadence.value:inputElevation.value),type)
    data.push(d);
    localStorage.setItem('data',JSON.stringify(data));
    clearform();
    rendermark(d);

}




function loadlocaldata(){
    let d=JSON.parse(localStorage.getItem('data'));
    if(!d||d.length==0)return;
    data=d

    for(let i of d){
        rendermark(i);
    }
}
function mapclick(mape){
    const { lat, lng } = mape.latlng;
    sessionStorage.setItem('curlat',lat);
    sessionStorage.setItem('curlong',lng);
    form.classList.remove('hidden')
}




function rendermark(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.step}</span>
          <span class="workout__unit">${workout.type=='running'?'spm':'m'}</span>
        </div>
      </li>
     
        `
        form.insertAdjacentHTML('afterend', html);


    L.marker(workout.coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
function loadmap(pos) {
    let {latitude,longitude} = pos.coords;
    
    

    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.on('click', mapclick);

    loadlocaldata()


  }

navigator.geolocation.getCurrentPosition((pos)=>{
    console.log(pos)
    loadmap(pos)
},()=>{
    alert('This app will not work until you allow your location.')
    document.location.reload();
})











// 82521afd-2607-44c0-96c4-e0502f4d673b
// the remote end hung up unexpectedly