import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  role: any;
  localStored_data: any;
  result: any;
  constructor(private router: Router,
    private dialog: MatDialog) {
     this.result = localStorage.getItem('STATE')
      this.localStored_data = JSON.parse(this.result);
    
    

  }
  logoutOnClick(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
