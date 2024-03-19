import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      progressBar : true,
      positionClass:'toast-bottom-right'
    }),
    NgxSpinnerModule
    // NgxGalleryModule
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    NgxSpinnerModule
    // NgxGalleryModule
  ],

  providers: []
})
export class SharedModule { }
