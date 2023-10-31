import { Component } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  trainingBool =false;

  exerciseSubscription!: Subscription;
  constructor(private trainingService: TrainingService){}

  ngOnInit(){
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(data =>{
      if(data)this.trainingBool = true;
      else this.trainingBool = false;
      
    }
    )
  }

}
