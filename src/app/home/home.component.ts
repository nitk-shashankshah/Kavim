import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	//private subscriber: any;
  products: any = [];
  fv = 3000;
  order = 1;
  minRange = 0;
  orders: any = [
    {value: '1', viewValue: 'Ascending'},
    {value: '-1', viewValue: 'Descending'}
  ];
  constructor(private http: HttpClient) {

  }

  resetMinMax(){
    if (this.minRange > this.fv){
      this.fv = this.minRange+100;
      if (this.fv>3000)
        this.fv=3000;
    }
  }
  ngOnInit() {
    //this.subscriber = this.route.params.subscribe(params => {
      this.http.get('http://kavim.co.in/api/v1/users').subscribe((data:any) => {
        this.products = data;   
      });
    //});
  }
}
