'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10) + Math.random();
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; // km
    this.duration = duration; // min
    this.coords = coords; // [lat,lng]
  }
  workoutDescription() {
    this.description = `${
      this.type.charAt(0).toUpperCase() + this.type.slice(1).toLowerCase()
    } on ${this.date.toString().slice(4, 11)}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this.workoutDescription();
  }
  calcPace() {
    // min / km
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.workoutDescription();
  }
  calcSpeed() {
    // km / h
    this.speed = this.distance / (this.duration / 60);
  }
}

class App {
  #workout = [];
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this.#_toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    this._getLocalStorage();
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#_loadMap.bind(this),
        function () {
          alert('can not get position');
        }
      );
  }

  #_loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this.#_showForm.bind(this));

    this.#workout.forEach(work => {
      this._renderWorkoutMarker(work)
    });
  }

  #_showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);

    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  #_toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();
    const inputvalid = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    //Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      //chack if the data valid
      if (
        !inputvalid(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('enter positive numbers');

      // if workout Running ,create running object
      const { lat, lng } = this.#mapEvent.latlng;
      workout = new Running(distance, duration, [lat, lng], cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //chack if the data valid
      if (
        !inputvalid(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('enter positive numbers');
      //if workout cycling ,create cycling
      const { lat, lng } = this.#mapEvent.latlng;
      workout = new Cycling(distance, duration, [lat, lng], elevation);
    }

    // add the workout object to the workout array
    this.#workout.push(workout);
    // Render workout on a map as a marker
    this._renderWorkoutMarker(workout);
    //Render workout on  list
    this._renderWorkout(workout);

    //hide the form + clear the form fields
    this._hideForm();

    //set local storage to all workours
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
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

  _renderWorkout(workout) {
    const workoutHtml = `
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
            <span class="workout__value">${
              workout.type === 'running'
                ? workout.pace.toFixed(1)
                : workout.speed.toFixed(1)
            }</span>
            <span class="workout__unit">${
              workout.type === 'running' ? 'min/km' : 'km/h'
            }</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🦶🏼' : '⛰'
            }</span>
            <span class="workout__value">${
              workout.type === 'running'
                ? workout.cadence
                : workout.elevationGain
            }</span>
            <span class="workout__unit">${
              workout.type === 'running' ? 'spm' : 'm'
            }</span>
          </div>
        </li>`;
    form.insertAdjacentHTML('afterend', workoutHtml);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workout.find(
      workout => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workout));
  }

  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'));
    if(!data)return;
    this.#workout = data;

    this.#workout.forEach(work => {
      this._renderWorkout(work);
    });

  }
}

const app = new App();
console.log(app);
