import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() userList:any 
  @Output() cancelRegistration = new EventEmitter()
  model:any = {}

  constructor(private AccountService:AccountService,private toastr:ToastrService){}

  register(){
    this.AccountService.register(this.model).subscribe(responce=>{
      this.toastr.success("Success")
    },error=>{
      this.toastr.error(error.error)
    })
    this.cancel()

  }
  cancel(){
   
    this.cancelRegistration.emit(false)
  }

}
