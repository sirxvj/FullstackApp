import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account/account.service';
import { MembersService } from '../../_services/members/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm
  member:Member
  user:User

  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
   if(this.editForm.dirty)
    $event.returnValue=true
  }
  constructor(private accountService:AccountService,
    private memberService:MembersService,private toastr:ToastrService){
    accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user
    })
  }
  ngOnInit(): void {
    this.memberService.getMember(this.user.username).subscribe(member=>{
      this.member = member
    }
    )
  }
  updateChanges(){
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Updated");
      this.editForm.reset(this.member);
    })
    
  }

}
