import { Component } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members/members.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent{
  member:Member
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  constructor(public memberService:MembersService,private router: ActivatedRoute){}
  ngOnInit(){
    this.getMemberDetails()
    // this.galleryOptions = [
    //   {
    //     width: '600px',
    //     height: '600px',
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide
    //   }];
  }
  // setMemberGallery():NgxGalleryImage[]{
  //   const ImageUrls = [];
  //   for(const photo of this.member.photos){
  //     ImageUrls.push({
  //       small:photo?.url,
  //       medium:photo?.url,
  //       large:photo?.url
  //     })
  //   }
  //   return ImageUrls
  // }
  getMemberDetails(){
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member=>{
      
      if(member.photoUrl?.charAt(40)==="0") 
        member.photoUrl = member.photoUrl.replace("0","3")
      this.member = member
      // this.galleryImages = this.setMemberGallery()
    })
  }
  getLastSeen():string{
    return this.memberService.lastSeen(this.member)
  }
  
}
