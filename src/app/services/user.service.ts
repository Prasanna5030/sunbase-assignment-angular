import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from 'module';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  httpClient!:HttpClient

  getToken(){
    return localStorage.getItem('token');
  }

  url:string= "http://localhost:8080";
  apiUrl= environment.apiUrl;

  dockerUrl:string = 'http://food-ordering-app:8080';


  constructor( private router : Router, private ngxUiLoader :NgxUiLoaderService ,private handler:HttpBackend) { 
   this.httpClient=new HttpClient(handler);
  }

  signup(data:any){
    return this.httpClient.post(this.url+"/api/auth/register",data, 
      { headers: new HttpHeaders().set('Content-Type','application/json')} )
      .pipe(
      catchError(error => {
        if (error.status !== 200) {
          this.ngxUiLoader.stop();
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }


  login(data:any){
    return this.httpClient.post(this.url+"/api/auth/authenticate", data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    }).pipe(
      catchError(error => {
        if (error.status !== 200) {
          console.log("error while login")
          this.ngxUiLoader.stop();
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+"/api/auth/forgotpassword", data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
     }).pipe(
      catchError(error => {
        if (error.status !== 200) {
          this.ngxUiLoader.stop();
          console.log("error while signup")
          this.router.navigate(['/error']);
        }
        return throwError(error);
      })
    )
  }


  checkToken(){
    return this.httpClient.get(this.url+"/api/auth/checktoken")
  }


 
  update(data:any){
    return this.httpClient.post(this.url+"/home/user/update",data,
      {
        headers: new HttpHeaders().set('Content-Type','application/json')
      }).pipe(
       catchError(error => {
         if (error.status !== 200) {
           this.ngxUiLoader.stop();
           console.log("error while signup")
           this.router.navigate(['/error']);
         }
         return throwError(error);
       })
     )

  }

  delete(data:any){
    return this.httpClient.post(this.url+"/home/user/delete",data,
      {
        headers: new HttpHeaders().set('Content-Type','application/json')
      }).pipe(
       catchError(error => {
         if (error.status !== 200) {
           this.ngxUiLoader.stop();
           console.log("error while signup")
           this.router.navigate(['/error']);
         }
         return throwError(error);
       })
     )

  }

}
