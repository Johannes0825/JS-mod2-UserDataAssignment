export const storeWorkout = (workout) => {
   localStorage.setItem(workout.id, JSON.stringify(workout));
};

export const fetchWorkouts = () => {
   const workouts = [];
   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      workouts.push(value);
   }
   return workouts;
};

export const deleteWorkout = (id) => {
   localStorage.removeItem(id);
};
