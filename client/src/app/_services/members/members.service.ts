import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../_models/member';
import { environment } from '../../../environments/environment.development';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members:Member[]=[]


  constructor(private http:HttpClient) { }

  getMembers(){
    console.log(this.members)
    if(this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(environment.BASE_URL + '/api/user').pipe(
        map(members=>{
          this.members = members
          return members
        }
        )
      )
  }
  getMember(username:string){
      const member = this.members.find(u=>u.username===username)
    if(member!==undefined) return of(member)
    return this.http.get<Member>(environment.BASE_URL + '/api/user/username/'+username)
  }

  updateMember(member:Member){
    return this.http.put(environment.BASE_URL + '/api/user',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member)
        this.members[index]=member
      }

      )
    )
  }

  lastSeen(member:Member):string{
    const lastDate = new Date(member.lastActive)
    let result = 'last seen '
    const currentDate = new Date()
    const diff = Math.abs(currentDate.getTime()-lastDate.getTime())

    result += diff>1000*3600*24*365?
     Math.round(diff/(1000*3600*24*365)).toString()+' years': 
     diff>1000*3600*24*30?
     Math.round(diff/(1000*3600*24*30)).toString()+' month':
     diff>1000*3600*24?
     Math.round(diff/(1000*3600*24)).toString()+' days':
     diff>1000*3600?
     Math.round(diff/(1000*3600)).toString()+' hours':
     diff>1000*60?
     Math.round(diff/(1000*60)).toString()+' minutes':
     diff>1000?
     Math.round(diff/1000).toString()+' seconds':
     ' right now'
     result += ' ago'
     
     return result 
    
  }
}
