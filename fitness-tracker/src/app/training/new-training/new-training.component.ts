import { Component } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {

  exercises?: Exercise[];

  constructor(private trainingService: TrainingService){}

  ngOnInit(){
    this.exercises = this.trainingService.getExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exerciseId);
    console.log(this.trainingService.getCurrentExercise());
    
  }

}
