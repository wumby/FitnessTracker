import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/models/exercise';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  private exChangedSubscription!: Subscription;

  displayedColumns = [
    'date',
    'name',
    'duration',
    'calories'
  ];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService){

  }

  ngOnInit(){
    this.trainingService.fetchAllExercises();
    this.exChangedSubscription =this.trainingService.finishedExercisedChanged.subscribe((exercises:any[])=>{
      console.log(exercises);
      
      this.dataSource.data=exercises;
      console.log(this.dataSource.data);
      
    })
   
  }

  check(element: any){
    console.log(element);
    
  }

  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy(){
    this.exChangedSubscription.unsubscribe();
  }

  filter(event: Event){
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter! = filterVal!.trim()!.toLowerCase()!;
  }

}
