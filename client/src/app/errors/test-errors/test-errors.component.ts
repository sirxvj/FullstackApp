import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

const BASE_URL = environment.BASE_URL
@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  constructor(private http:HttpClient){}
  
  test400(){
    return this.http.get(BASE_URL + '/api/errors/bad-request').subscribe(
      response=>{
        console.log(response)
      },
      error=>console.log(error)
    )
  }
  test401(){
    return this.http.get(BASE_URL + '/api/errors/auth').subscribe(
      response=>{
        console.log(response)
      },
      error=>console.log(error)
    )
  }
  test404(){
    return this.http.get(BASE_URL + '/api/errors/not-found').subscribe(
      response=>{
        console.log(response)
      },
      error=>console.log(error)
    )
  }
  test500(){
    return this.http.get(BASE_URL + '/api/errors/server-error').subscribe(
      response=>{
        console.log(response)
      },
      error=>console.log(error)
    )
  }
  test400Validation(){
    return this.http.post(BASE_URL + '/api/account/login',{}).subscribe(
      response=>{
        console.log(response)
      },
      error=>console.log(error)
    )
  }
}
