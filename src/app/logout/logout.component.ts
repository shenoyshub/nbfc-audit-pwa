import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  providers: [AuthService],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(  private auth: AuthService) { 
    console.log('Logout component initialized');
  }

  ngOnInit() {
    console.log('Logging out user...');   
    this.auth.logout();
  }

}
