import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
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

  onSubmit() : void {
    if(this.cliente.id) {
      this.service.update(this.cliente).subscribe(response => {
        this.snackBar.open('Cliente atualizado com sucesso', 'Fechar', {
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
    } else {
      this.service.create(this.cliente).subscribe(() => {
        this.snackBar.open('Cliente cadastrado com sucesso', 'Fechar', {
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

  addPerfil(perfil: any) : void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCompos() : boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

}
