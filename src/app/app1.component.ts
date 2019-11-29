import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "./app.service";
import * as socketIo from 'socket.io-client';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
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
  constructor(private appService: AppService, private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    window.addEventListener("DataUpdated", () => {
      this.appService.getData().subscribe(data => {
        this.object = data;
        this.changeDetectorRef.detectChanges();
      });
    });
    this.appService.getData().subscribe(data => { this.object = data });
  }
  deleteRecord(id) {
    var res;
    this.appService._deleteRecord(id).subscribe(data => {
      res = data;
      if (res.message) {
        event = new Event('DataUpdated');
        window.dispatchEvent(event);
      }
    });
  }
  editRecord(id, rec) {
    var event = new CustomEvent('oldData', { "detail": { "id": id, ...rec } });
    window.dispatchEvent(event);
  }
  addGST(id, rec) {
    var event = new CustomEvent('addGST', { "detail": { "id": id, ...rec } });
    window.dispatchEvent(event);
  }
}
