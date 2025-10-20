import { fetchWorkouts, deleteWorkout } from "./localstorage.js";
import { updateDisplayElements } from "../main.js";

const workoutContainer = document.getElementById("workout-container");

const makeWorkoutCard = (object, id) => {
   const card = document.createElement("div");
   card.classList.add("card");
   card.id = id;

   const dateEl = document.createElement("p");
   dateEl.textContent = object.date;
   card.append(dateEl);

   const typeEl = document.createElement("p");
   typeEl.textContent = object.type;
   card.append(typeEl);

   const durationEl = document.createElement("p");
   durationEl.textContent = object.duration;
   card.append(durationEl);

   const intesityEl = document.createElement("p");
   intesityEl.textContent = object.intensity;
   card.append(intesityEl);

   const notesEl = document.createElement("p");
   notesEl.textContent = object.notes;
   card.append(notesEl);

   if (object.favourite === "on") {
      const favouriteEl = document.createElement("p");
      favouriteEl.textContent = "favourite";
      card.append(favouriteEl);
   }

   const deleteBtn = document.createElement("button");
   deleteBtn.textContent = "delete";
   card.append(deleteBtn);
   deleteBtn.addEventListener("click", () => {
      console.log(id);
      deleteWorkout(id);
      updateDisplayElements();
   });

   workoutContainer.append(card);
};

export const renderUI = (workoutsToDisplay) => {
   workoutContainer.innerHTML = "";

   for (const workout of workoutsToDisplay) {
      makeWorkoutCard(workout, workout.id);
   }
};
