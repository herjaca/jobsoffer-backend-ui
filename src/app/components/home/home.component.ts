import { Component, OnInit } from '@angular/core';
import { JobsOffersService } from '../../services/jobs.offers.service';
import { formatDate } from "@angular/common";

interface City {
  value: string;
  viewValue: string;
};

interface Language {
  value: string;
  viewValue: string;
};

interface Response{
  company:String;
  title:String;
  type:String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {

  constructor(private jobsOfferService: JobsOffersService) { }
  
  cities:City[] = [
    {value: 'chicago', viewValue: 'Chicago'},
    {value: 'san francisco', viewValue: 'San Francisco'},
    {value: 'phoenix', viewValue: 'Phoenix'},
    {value: 'london', viewValue: 'London'},
    {value: 'beijing', viewValue: 'Beijing'},
    {value: 'paris', viewValue: 'Paris'}
  ];

  languages:Language[] = [
    {value: 'javascript', viewValue: 'Javascript'},
    {value: 'java', viewValue: 'Java'},
    {value: 'python', viewValue: 'Python'},
    {value: 'react', viewValue: 'React'},
    {value: 'ruby', viewValue: 'Ruby'},
    {value: 'go', viewValue: 'Go'}
  ];


  jobs:any[] = [];
  selectedCity = this.cities[1].value;
  selectedLanguage = this.languages[1].value;

  first = true;
  refreshLanguage:string = "";
  refreshCity:string = "";
  publicIP:string = "";


  search(){
    this.getPublicIP();
    let formattedDate = this.formatNowDate();
    let description = this.selectedLanguage;
    let location = this.selectedCity;
    this.jobsOfferService.searchJobs(description, location).subscribe(
      (response) =>{
        this.jobsOfferService.saveSearch(formattedDate,description,location,this.publicIP).subscribe(
          response => console.log(response),
          error => console.log(error));
        this.jobsResponse(response);
    });
  }

  private formatNowDate() {
    let now = new Date();
    let format = 'YYYY-MM-dd';
    let locale = 'en-US';
    let formattedDate = formatDate(now, format, locale);
    return formattedDate;
  }

  private jobsResponse(response: Object) {
    this.jobs = [];
    console.log(response);
    for (const job of (response as any)) {
      this.jobs.push({
        company: job.company,
        description: job.description,
        type: job.type,
        title: job.title
      });
    }
    this.refresh();
  }

  private refresh() {
    this.refreshLanguage = this.selectedLanguage;
    this.refreshCity = this.selectedCity;
    this.first = false;
  }

  private getPublicIP(){
    this.jobsOfferService.getPublicIP().subscribe((res:any)=>{  
      this.publicIP = res.ip;  
    });
  }

}
