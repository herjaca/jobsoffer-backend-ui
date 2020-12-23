import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'

import {  throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsOffersService {

  private REST_API_SERVER = "http://localhost:8080/jobsoffer";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  searchJobs(description:string, location:string){
    let params = new HttpParams();
    params = params.append('description',description);
    params = params.append('location',location);
    return this.httpClient.get(this.REST_API_SERVER,{params}).pipe(catchError(this.handleError));
  }

  saveSearch(time:string, description:string, location:string, userIpAddress:string){
    let body =  { time,description,location,userIpAddress};
    return this.httpClient.post(this.REST_API_SERVER,body).pipe(catchError(this.handleError));
  }

}
