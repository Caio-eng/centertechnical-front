import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      this.cliente = resposta;
    })
  }

  delete() : void {
    this.service.delete(this.cliente.id).subscribe(response => {
      this.snackBar.open('Cliente deletado com sucesso', 'Fechar', {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
      this.router.navigate(['clientes']);
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
