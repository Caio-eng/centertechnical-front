import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

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

  delete() : void {
    this.service.delete(this.tecnico.id).subscribe(response => {
      this.snackBar.open('Técnico deletado com sucesso', 'Fechar', {
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
