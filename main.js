import { Workout } from "./components/Workout.js";
import { fetchWorkouts, storeWorkout } from "./components/localstorage.js";
import { renderUI } from "./components/UI.js";

const formElement = document.getElementById("workout-form");
const filterBtn = document.getElementById("filter-button");
const filterSelect = document.getElementById("filter");
const resetBtn = document.getElementById("reset-button");

formElement.addEventListener("submit", (event) => {
   event.preventDefault();
   makeWorkout(formElement);
   updateDisplayElements();

   // handleSubmit();
});

document.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      event.preventDefault();
      // handleSubmit();
      makeWorkout(formElement);
      updateDisplayElements();
   }
});

// makeWorkoutCard();

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
   // console.log(workout);
   storeWorkout(workout);
};

export const updateDisplayElements = () => {
   const allWorkouts = fetchWorkouts();
   const filterValue = filterSelect.value;
   console.log(filterValue);

   let workoutsToDisplay;

   if (filterValue) {
      workoutsToDisplay = allWorkouts.filter(
         (workout) => workout.type === filterValue
      );
   } else {
      workoutsToDisplay = allWorkouts;
   }

   renderUI(workoutsToDisplay);
   console.log(workoutsToDisplay);
};

filterBtn.addEventListener("click", () => {
   updateDisplayElements();
});

resetBtn.addEventListener("click", () => {
   filterSelect.value = null;
   updateDisplayElements();
});

document.addEventListener("DOMContentLoaded", updateDisplayElements);

// console.log(crypto.randomUUID());
