import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  config: MatSnackBarConfig = {
    duration: 7000 
  };
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.navigate(['chamados/read/1'])
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.snackBar.open('Logout realizado com sucesso', 'Fechar', this.config)
  }

}
