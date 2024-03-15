import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account/account.service';
import { MembersService } from '../../_services/members/members.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  member:Member
  user:User

  constructor(private accountService:AccountService,private memberService:MembersService){
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
 

}