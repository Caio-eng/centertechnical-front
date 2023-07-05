import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }

  onSubmit() : void {
    if(this.tecnico.id) {
      this.service.update(this.tecnico).subscribe(response => {
        this.snackBar.open('Técnico atualizado com sucesso', 'Fechar', {
          duration: 4000,
          panelClass: ['success-snackbar']
        })
        this.router.navigate(['tecnicos']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.array.forEach(element => {
            this.snackBar.open(element.message, 'Fechar', {
              duration: 4000,
              panelClass: ['error-snackbar']
            });
          });
        } else {
          this.snackBar.open(ex.error.message, 'Fechar', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      })
    } else {
      this.service.create(this.tecnico).subscribe(() => {
        this.snackBar.open('Técnico cadastrado com sucesso', 'Fechar', {
          duration: 4000,
          panelClass: ['success-snackbar']
        })
        this.router.navigate(['tecnicos']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.array.forEach(element => {
            this.snackBar.open(element.message, 'Fechar', {
              duration: 4000,
              panelClass: ['error-snackbar']
            });
          });
        } else {
          this.snackBar.open(ex.error.message, 'Fechar', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      })
    }
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
