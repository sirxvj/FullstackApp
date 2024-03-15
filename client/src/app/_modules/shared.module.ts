import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      progressBar : true,
      positionClass:'toast-bottom-right'
    }),
    NgxGalleryModule
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    NgxGalleryModule
  ],

  providers: []
})
export class SharedModule { }
