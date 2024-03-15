import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false
  constructor(){}

  ngOnInit(): void {
      
  }

  setToggle(){
    console.log('settoggle')
    this.registerMode = !this.registerMode
  }
  

  cancelReg(event:boolean){
    this.registerMode = event;
  }
}
