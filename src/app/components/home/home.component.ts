import { Component, OnInit } from '@angular/core';
import { JobsOffersService } from '../../services/jobs.offers.service'

interface City {
  value: string;
  viewValue: string;
};

interface Language {
  value: string;
  viewValue: string;
};

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

  selectedCity = this.cities[1].value;
  selectedLanguage = this.languages[1].value;

  

  // ngOnInit(): void {
      // this.jobsOfferService.testRequest().subscribe(data=>{
      //   console.log(data)
      // })
  // }

  // send(languageSelected:string, citySelected:string){
    

  //   let ip = window.location.origin
  //   let now : string = new Date().toISOString();

  //   this.jobsOfferService.search(now, languageSelected, citySelected, ip);
  // }
  send(){
    console.log('LOCATION: '+this.selectedCity);
    console.log('DESCRIPTION: '+this.selectedLanguage);
    let ip = window.location.origin
    let now : string = new Date().toISOString();
    this.jobsOfferService.search(now, this.selectedLanguage, this.selectedCity, ip);
  }
}
