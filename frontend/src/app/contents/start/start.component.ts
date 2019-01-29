import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { Config } from '../../config';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  providers: [ DashService ]
})

export class StartComponent implements OnInit {

  constructor(private dashService: DashService) { }

  config: Config;
  resp: HttpResponse<Config>;
  error;
  dash: string;

  ngOnInit() {
    this.showConfig();
    this.getDash();
  }

  showConfig() {
    this.dashService.getConfig()
      .subscribe((text) => this.dash = text);
  }
  // showConfig() {
  //   this.dashService.getConfig()
  //     .subscribe((data: Config) => this.config = {
  //       heroesUrl: data['heroesUrl'],
  //       textfile:  data['textfile']
  //     },
  //     error => this.error = error
  //     );
  // }

  getDash() {
    this.dashService.getTextFile('http://127.0.0.1:5000/dashboard/')
      .subscribe((text) => this.dash = text );
  }

}
