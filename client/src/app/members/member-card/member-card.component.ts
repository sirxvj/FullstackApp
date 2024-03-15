import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member : Member

  lastSeen():string{
    const lastDate = new Date(this.member.lastActive)
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
    //return diff.toString()
  }
}
