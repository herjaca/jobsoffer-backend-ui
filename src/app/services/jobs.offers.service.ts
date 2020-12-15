import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class JobsOffersService {

  private REST_API_SERVER = "http://localhost:8080/jobsoffer";

  constructor(private httpClient: HttpClient) { }

  // public testRequest(){
  //   return this.httpClient.get(this.REST_API_SERVER);
  // }

  search(time:string, description:string, location:string, userIpAddress:string){
    let body =  { time,description,location,userIpAddress};
    return this.httpClient.post(this.REST_API_SERVER,body);
  }

}
