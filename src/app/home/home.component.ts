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

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    //this.subscriber = this.route.params.subscribe(params => {       
      this.http.get('/api/v1/users').subscribe((data:any) => {
        this.products = data;   
      });
    //});
  }
}
