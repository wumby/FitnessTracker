import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent {
  progress=0;
  timer!: any;

  constructor(private dialog: MatDialog, private trainingService: TrainingService){}

  ngOnInit(){
    this.startTimer();
  }

  startTimer(){
    const interval = this.trainingService.getCurrentExercise().duration!/100 * 1000;
    this.timer = setInterval(() =>{
      this.progress = this.progress+1;
      if(this.progress >=100){
        this.trainingService.successfulExercise();
        clearInterval(this.timer);
      }
        }, interval)
  }

  stopTraining(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {progress: this.progress}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result) this.trainingService.stopExercise(this.progress);
      else this.startTimer();
      
    });
  }

}
