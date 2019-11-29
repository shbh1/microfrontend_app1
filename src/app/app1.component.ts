import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AppService } from "./app.service";
import * as socketIo from 'socket.io-client';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app1';
  // @ts-ignore
  assetsBase = __webpack_public_path__;
  object; controls: FormArray;
  constructor(private appService: AppService) {
  }
  ngOnInit() {
    const socket = socketIo('http://10.10.114.97:5555');
    socket.on('dataRefresh', (dt) => {
      this.appService.getData().subscribe(data => { this.object = data });
    });
    this.appService.getData().subscribe(data => { this.object = data });
  }
  deleteRecord(id) {
    this.appService._deleteRecord(id).subscribe(data => {
      alert("Record Deleted !!");
    });
  }
  editRecord(id, rec) {
    this.appService._editRecord(id, rec).subscribe(data => {
    });
  }
  addGST(id, rec) {
    this.appService.recordGST(id, rec).subscribe(data => {
    });
  }
}
