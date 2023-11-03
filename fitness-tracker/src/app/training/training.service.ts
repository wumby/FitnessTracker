import { Observable, Subject, Subscription } from "rxjs";
import { Exercise } from "../models/exercise";
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData } from "@angular/fire/firestore";
import { inject } from "@angular/core";

export class TrainingService {
    exerciseChanged = new Subject<Exercise | null>();
    exercisesChanged = new Subject<Exercise[]>;
    finishedExercisedChanged = new Subject<Exercise[]>;
    private currentExercise: Exercise | undefined | null;
    usersCollection: CollectionReference;
    private fbSubscriptions: Subscription[]=[];

    constructor(){
        this.usersCollection=collection(this.firestore, 'finishedExercises');
    }
  firestore: Firestore = inject(Firestore);

    private availableExercises: Exercise[] = [
    ]

    getExercises() {
        const itemCollection = collection(this.firestore, 'availableExercises');
        this.fbSubscriptions.push(collectionData(itemCollection).subscribe(
             (data:any[]) =>{
                
                this.availableExercises=data;
                this.exercisesChanged.next([...this.availableExercises]);
            }
            
        ));

        
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
            name: this.currentExercise?.name!,
            date: new Date(), 
            state: 'cancelled'});
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }

    getCurrentExercise() {
        return { ...this.currentExercise };
    }

    fetchAllExercises(){
        this.fbSubscriptions.push(collectionData(this.usersCollection).subscribe((exercises: any[]) =>{
            
            this.finishedExercisedChanged.next(exercises);
        })
        
    )}

    cancelSubs(){
        this.fbSubscriptions.forEach(sub => sub.unsubscribe())
;    }

    private addDataToDatabase(exercise: Exercise){
        addDoc(this.usersCollection, <Exercise><unknown>{ exercise });
    }

}