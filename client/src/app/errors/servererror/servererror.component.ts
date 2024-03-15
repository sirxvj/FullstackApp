import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servererror',
  templateUrl: './servererror.component.html',
  styleUrl: './servererror.component.css'
})
export class ServererrorComponent {
  error:any
  constructor(private router: Router){
      const navigation = router.getCurrentNavigation()
      this.error = navigation.extras.state.error
  }
}
