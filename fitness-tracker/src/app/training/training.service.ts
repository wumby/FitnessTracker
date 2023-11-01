import { Observable, Subject } from "rxjs";
import { Exercise } from "../models/exercise";
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData } from "@angular/fire/firestore";
import { inject } from "@angular/core";

export class TrainingService {
    exerciseChanged = new Subject<Exercise | null>();
    exercisesChanged = new Subject<Exercise[]>;
    finishedExercisedChanged = new Subject<Exercise[]>;
    private currentExercise: Exercise | undefined | null;
    usersCollection: CollectionReference;

    constructor(){
        this.usersCollection=collection(this.firestore, 'finishedExercises');
    }
  firestore: Firestore = inject(Firestore);

    private availableExercises: Exercise[] = [
    ]

    getExercises() {
        const itemCollection = collection(this.firestore, 'availableExercises');
        collectionData(itemCollection).subscribe(
             (data:any[]) =>{
                
                this.availableExercises=data;
                this.exercisesChanged.next([...this.availableExercises]);
            }
            
        );
    }

    startExercise(selectedId: string) {
        this.currentExercise = this.availableExercises.find(ex => ex.name === selectedId);
        this.exerciseChanged.next({ ...this.currentExercise! })
    }

    successfulExercise() {
        
        this.addDataToDatabase({...this.currentExercise!, date: new Date(), state: 'completed'});
        this.currentExercise = null;
        this.exerciseChanged.next(null);

    }

    stopExercise(progress: number) {
        this.addDataToDatabase({...this.currentExercise!,
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

    fetchAllExercises(){
        collectionData(this.usersCollection).subscribe((exercises: any[]) =>{
            console.log(exercises);
            
            this.finishedExercisedChanged.next(exercises);
        })
    }

    private addDataToDatabase(exercise: Exercise){
        addDoc(this.usersCollection, <Exercise><unknown>{ exercise });
    }

}