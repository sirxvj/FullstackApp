import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members/members.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  members : Member[]

  constructor(private membersService:MembersService){}
  ngOnInit(): void {
    this.loadMembers()
  }
  loadMembers(){
    this.membersService.getMembers().subscribe(members=>{
      members.map(
        member=>{
          if(member.photoUrl?.charAt(40)==="0") 
            member.photoUrl = member.photoUrl.replace("0","3")
        }
      )
      this.members = members;
    })
  }
 
}
