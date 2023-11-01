import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { RegisterComponent } from './auth/register/register.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { DatePipePipe } from './pipes/date-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    SideNavComponent,
    StopTrainingComponent,
    DatePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"workout-partner-eae36","appId":"1:334614578782:web:046d47381d62073d9116cf","storageBucket":"workout-partner-eae36.appspot.com","apiKey":"AIzaSyBtAS1mYNu-1lerR7dor7snYH1H07RJBqo","authDomain":"workout-partner-eae36.firebaseapp.com","messagingSenderId":"334614578782","measurementId":"G-MEPXRY373H"})),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
