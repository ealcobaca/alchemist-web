import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash.service';
import { PredConf } from '../../pred-conf';
import { Pred, FormPred} from '../../atomos';
import {MatTableModule} from '@angular/material/table';
// import {MatPaginator, MatTableDataSource} from '@angular/material';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//
// ];

// const ELEMENT_DATA: Pred[] = [
//   {formula: '1', glass_property: 'Hydrogen', ml_algorithm: '1.0079', value: 'H'},
//   {formula: '2', glass_property: 'Hydrogen', ml_algorithm: '1.0079', value: 'H'},
//   {formula: '3', glass_property: 'Hydrogen', ml_algorithm: '1.0079', value: 'H'},
//   {formula: '4', glass_property: 'Hydrogen', ml_algorithm: '1.0079', value: 'H'},
// ];

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})

export class PredictionComponent implements OnInit {
  predConf: PredConf[];
  dataSource: Pred[];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['formula', 'glass_property', 'ml_algorithm', 'value'];
  // dataSource = ELEMENT_DATA;


  constructor(private dashService: DashService) { }

  ngOnInit() {
    this.getPredConfig();
    this.dataSource = [];
  }

  getPredConfig(): void {
    this.dashService.getPredConfig()
    .subscribe(predConf => this.predConf = predConf);
  }

  save(): void {
    console.log(this.predConf);
    console.log(this.dataSource);
  }

  predict(formula: string, glass_property: string, ml_algorithm: string) {

    if (!formula) { return; }
    if (!glass_property) { return; }
    if (!ml_algorithm) { return; }
    console.log(formula);
    console.log(glass_property);
    console.log(ml_algorithm);
    this.dashService.predFormula({ formula, glass_property, ml_algorithm } as FormPred)
    .subscribe(pred => this.dataSource.push(pred));
    console.log(this.dataSource);
  }

 refresh(): void {
   dataSource.renderRows()
  }
}
