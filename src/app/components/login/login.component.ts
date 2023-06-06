import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  
  constructor(
    private snackBar: MatSnackBar,
    private service: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(response => {
      this.service.successfulLogin(response.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    }, () => {
      this.snackBar.open('Usuário e/ou senha inválidos', 'ERROR!', {
        duration: 4000
      },)
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
