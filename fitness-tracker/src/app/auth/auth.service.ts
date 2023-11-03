import { Subject } from "rxjs";
import { AuthData } from "../models/authData";
import { User } from "../models/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Auth as FirebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth  } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions'

@Injectable()
export class AuthService{
    private auth = inject(Auth)
    authChange = new Subject<boolean>();
    private user!: User | null;
    private isAuthenticated= false;

    constructor(private router: Router, private trainingService: TrainingService, private snackbar: MatSnackBar,
         private uiService: UIService, private store: Store<{ui: fromRoot.State}>){}

    registerUser(authData: AuthData){
        this.store.dispatch({type: '[UI] Start Loading'});
        createUserWithEmailAndPassword(this.auth,authData.email,authData.password).then(
            result =>{
                this.store.dispatch({type: '[UI] Stop Loading'})
                this.authSuccesful();
                
            }
        ).catch(error=>{
            this.store.dispatch({type: '[UI] Stop Loading'})
            if(error.message =='Firebase: Error (auth/email-already-in-use).')
            this.snackbar.open('Email already in use', undefined, {
                duration:3000
            })
            
        })
        
            
        };
        
      
    

    login(authData: AuthData){
        this.store.dispatch({type: '[UI] Start Loading'})
        signInWithEmailAndPassword(this.auth,authData.email,authData.password).then(
            result =>{
                this.store.dispatch({type: '[UI] Stop Loading'})
                this.authSuccesful();
                
                
            }
        ).catch(error=>{
            this.store.dispatch({type: '[UI] Stop Loading'})
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