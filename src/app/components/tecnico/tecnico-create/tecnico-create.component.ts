import { Router } from '@angular/router';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

   config: MatSnackBarConfig = {
    duration: 4000 
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {}

  create() : void {
    this.service.create(this.tecnico).subscribe(() => {
      this.snackBar.open('Técnico cadastrado com sucesso', 'Fechar', this.config);
      this.router.navigate(['tecnicos']);
    }, ex => {
      if (ex.error.erros) {
        ex.error.errors.forEach(element => {
          this.snackBar.open(element.message, 'Fechar', this.config);
        });
      } else {
        this.snackBar.open(ex.error.message, 'Fechar', this.config);
      }
    })
  }

  addPerfil(perfil: any) : void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCompos() : boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}
