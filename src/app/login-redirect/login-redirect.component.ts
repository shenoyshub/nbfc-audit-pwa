import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  standalone: true,
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent implements OnInit {

  constructor( private router: Router 
  ) {}
    ngOnInit() { 
      const redirectUrl = localStorage.getItem('requestedUrl');
        if (redirectUrl) {
          localStorage.removeItem('requestedUrl');
         
          this.router.navigateByUrl(redirectUrl);
        }
        else{
          this.router.navigateByUrl("/home");
        }
        
      }
}
