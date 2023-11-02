import { Subject } from "rxjs";
import { AuthData } from "../models/authData";
import { User } from "../models/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Auth as FirebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth  } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthService{
    private auth = inject(Auth)
    authChange = new Subject<boolean>();
    private user!: User | null;
    private isAuthenticated= false;

    constructor(private router: Router, private trainingService: TrainingService, private snackbar: MatSnackBar){}

    registerUser(authData: AuthData){
        createUserWithEmailAndPassword(this.auth,authData.email,authData.password).then(
            result =>{
                console.log(result);
                this.authSuccesful();
                
            }
        ).catch(error=>{
            if(error.message =='Firebase: Error (auth/email-already-in-use).')
            this.snackbar.open('Email already in use', undefined, {
                duration:3000
            })
            
        })
        
            
        };
        
      
    

    login(authData: AuthData){
        signInWithEmailAndPassword(this.auth,authData.email,authData.password).then(
            result =>{
                console.log(result);
                this.authSuccesful();
                
            }
        ).catch(error=>{
            console.log(error);
            
        })
    }

    logout(){
        this.trainingService.cancelSubs();
        this.user = null;
        this.authChange.next(false);
        this.isAuthenticated=false;
        this.router.navigate(['login']);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.isAuthenticated;
    }

    private authSuccesful(){
        this.isAuthenticated=true;
        this.authChange.next(true);
        this.router.navigate(['training']);
    }
}