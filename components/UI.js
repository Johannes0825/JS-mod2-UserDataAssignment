import { fetchWorkouts, deleteWorkout } from "./localstorage.js";
import { dom } from "./dom.js";

const {
   workoutContainer,
   filterSelect,
   filterBtn,
   resetBtn,
   sortSelect,
   sortBtn,
   dateInput,
   typeInput,
   durationInput,
   intensityInput,
   notesInput,
   favouriteInput,
} = dom;

const makeWorkoutCard = (object, id) => {
   const { date, type, duration, intensity, notes, favourite } = object;

   const card = document.createElement("div");
   card.classList.add("card");
   card.id = id;

   const dateEl = document.createElement("p");
   dateEl.textContent = date;
   card.append(dateEl);

   const typeEl = document.createElement("p");
   typeEl.textContent = type;
   card.append(typeEl);

   const durationEl = document.createElement("p");
   durationEl.textContent = duration;
   card.append(durationEl);

   const intesityEl = document.createElement("p");
   intesityEl.textContent = intensity;
   card.append(intesityEl);

   const notesEl = document.createElement("p");
   notesEl.textContent = notes;
   card.append(notesEl);

   if (favourite === "on") {
      const favouriteEl = document.createElement("p");
      favouriteEl.textContent = "favourite";
      card.append(favouriteEl);
   }

   const deleteBtn = document.createElement("button");
   deleteBtn.textContent = "Delete";
   card.append(deleteBtn);
   deleteBtn.addEventListener("click", () => {
      console.log(id);
      deleteWorkout(id);
      updateDisplayElements();
   });

   const editBtn = document.createElement("button");
   editBtn.textContent = "Edit";
   card.append(editBtn);
   editBtn.addEventListener("click", () => {
      dateInput.value = date;
      typeInput.value = type;
      durationInput.value = duration;
      intensityInput.value = intensity;
      notesInput.value = notes;
      favouriteInput.checked = favourite;

      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });

      deleteWorkout(id);
   });

   workoutContainer.append(card);
};

export const updateDisplayElements = () => {
   const allWorkouts = fetchWorkouts();
   const filterValue = filterSelect.value;
   const sortValue = sortSelect.value;

   let workoutsToDisplay;

   if (filterValue) {
      workoutsToDisplay = allWorkouts.filter(
         (workout) => workout.type === filterValue
      );
   } else if (sortValue === "ascending-date") {
      workoutsToDisplay = allWorkouts.sort(
         (a, b) => new Date(b.date) - new Date(a.date)
      );
   } else if (sortValue === "descending-date") {
      workoutsToDisplay = allWorkouts.sort(
         (a, b) => new Date(a.date) - new Date(b.date)
      );
   } else {
      workoutsToDisplay = allWorkouts;
   }

   renderUI(workoutsToDisplay);
   console.log(workoutsToDisplay);
};

const renderUI = (workoutsToDisplay) => {
   workoutContainer.innerHTML = "";

   for (const workout of workoutsToDisplay) {
      makeWorkoutCard(workout, workout.id);
   }
};

filterBtn.addEventListener("click", () => {
   updateDisplayElements();
});

sortBtn.addEventListener("click", () => {
   updateDisplayElements();
});

resetBtn.addEventListener("click", () => {
   filterSelect.value = null;
   updateDisplayElements();
});
