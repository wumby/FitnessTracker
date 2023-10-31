import { Subject } from "rxjs";
import { Exercise } from "../models/exercise";

export class TrainingService {
    exerciseChanged = new Subject<Exercise | null>();
    private currentExercise: Exercise | undefined | null;
    private exercises: Exercise[] =[];

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 5, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]

    getExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.currentExercise! })
    }

    successfulExercise() {
        
        this.exercises.push({...this.currentExercise!, date: new Date(), state: 'completed'});
        this.currentExercise = null;
        this.exerciseChanged.next(null);

    }

    stopExercise(progress: number) {
        this.exercises.push({...this.currentExercise!,
            duration: this.currentExercise?.duration! * (progress/100),
            calories: this.currentExercise?.calories! * (progress/100),
            date: new Date(), 
            state: 'cancelled'});
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }

    getCurrentExercise() {
        return { ...this.currentExercise };
    }

    getAllExercises(){
        return this.exercises.slice();
    }

}