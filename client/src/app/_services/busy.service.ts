import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  requestCount=0
  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.requestCount++;
    this.spinnerService.show(undefined, {
     bdColor:"rgba(0,0,0,0)",
  size:"medium",
  color:"black",
  type:"ball-beat"
    })
  }

  idle(){
    this.requestCount--;
    if(this.requestCount<=0){
      this.requestCount=0
      this.spinnerService.hide()
    }
  }
}
