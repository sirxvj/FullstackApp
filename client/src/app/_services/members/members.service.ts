import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../_models/member';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(environment.BASE_URL + '/api/user')
   
  }
  getMember(username:string){
    return this.http.get<Member>(environment.BASE_URL + '/api/user/username/'+username)
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
