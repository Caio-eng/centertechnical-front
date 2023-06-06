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
  
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logar() {
    this.snackBar.open('Usuário e/ou senha inválidos!', 'Login', {
      duration: 2000
    });
    this.creds.senha = '';
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid ? true : false;
  }

}
