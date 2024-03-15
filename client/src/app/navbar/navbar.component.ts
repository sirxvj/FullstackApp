import { Component } from '@angular/core';
import { AccountService } from '../_services/account/account.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  model: any = {}

  constructor(public accountService:AccountService, private router:Router,private toastr:ToastrService){}

  ngOnInit(): void{
    this.getCurrentUser()
  }

  login(){
    this.accountService.login(this.model).subscribe(responce=>{
      this.toastr.success("Login success")
      this.router.navigateByUrl('/members')
    },error=>{
      console.log(error)
      this.toastr.error(error.error)
    })
    
  }
  logout(){
    this.accountService.logout()
    this.model.username=""
    this.model.password=""
    this.router.navigateByUrl('/')
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user=>{
      console.log("getcurrent")
    }, error =>{
      console.log(error)
    }

    )
  }
}
