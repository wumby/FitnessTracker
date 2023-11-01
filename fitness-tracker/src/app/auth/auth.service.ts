import { Subject } from "rxjs";
import { AuthData } from "../models/authData";
import { User } from "../models/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Auth as FirebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth  } from "@angular/fire/auth";

@Injectable()
export class AuthService{
    private auth = inject(Auth)
    authChange = new Subject<boolean>();
    private user!: User | null;
    private isAuthenticated!: boolean;

    constructor(private router: Router){}

    registerUser(authData: AuthData){
        createUserWithEmailAndPassword(this.auth,authData.email,authData.password).then(
            result =>{
                console.log(result);
                this.authSuccesful();
                
            }
        ).catch(error=>{
            console.log(error);
            
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
        this.authSuccesful();
    }

    logout(){
        this.user = null;
        this.authChange.next(false);
        this.isAuthenticated=true;
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