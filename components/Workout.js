export class Workout {
   constructor(date, type, duration, intensity, notes, favourite) {
      this.id = crypto.randomUUID();
      this.date = date;
      this.type = type;
      this.duration = duration;
      this.intensity = intensity;
      this.notes = notes;
      this.favourite = favourite;
   }
}
