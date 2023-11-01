import { Component, inject } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  exercises!: Exercise[];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService){
    
  }

  ngOnInit(){
    this.exerciseSubscription =this.trainingService.exercisesChanged.subscribe(exercises =>(this.exercises=exercises));
    this.trainingService.getExercises();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exerciseId);
    console.log(form.value.exerciseId);
    
    console.log(this.trainingService.getCurrentExercise());
    
  }

}
