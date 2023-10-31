import { Subject } from "rxjs";
import { AuthData } from "../models/authData";
import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthService{
    authChange = new Subject<boolean>();
    private user!: User | null;

    constructor(private router: Router){}

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *10000).toString()
        };
        this.authSuccesful();
      
    }

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *10000).toString()
        };
        this.authSuccesful();
    }

    logout(){
        this.user = null;
        this.authChange.next(false);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.user != null;
    }
    private authSuccesful(){
        this.authChange.next(true);
        this.router.navigate(['training']);
    }
}