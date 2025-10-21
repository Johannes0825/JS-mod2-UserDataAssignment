import { Workout } from "./components/Workout.js";
import { storeWorkout } from "./components/localstorage.js";
import { updateDisplayElements } from "./components/UI.js";

const formElement = document.getElementById("workout-form");

formElement.addEventListener("submit", (event) => {
   event.preventDefault();
   makeWorkout(formElement);
   updateDisplayElements();
});

document.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      event.preventDefault();
      makeWorkout(formElement);
      updateDisplayElements();
   }
});

const getFormData = (formElement) => {
   const formData = new FormData(formElement);

   return Object.fromEntries(formData);
};

const makeWorkout = (formElement) => {
   const data = getFormData(formElement);
   const workout = new Workout(
      data.date,
      data.type,
      data.duration,
      data.intensity,
      data.notes,
      data.favourite
   );
   storeWorkout(workout);
};

document.addEventListener("DOMContentLoaded", updateDisplayElements);
