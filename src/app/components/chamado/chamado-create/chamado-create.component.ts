import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  onSubmit(): void {
    if (this.chamado.id) {
      this.chamadoService.update(this.chamado).subscribe(resposta => {
        this.snackBar.open("Chamado Atualizado com sucesso", "Fechar", {
          duration: 4000,
          panelClass: ["success-snackbar"],
        });
        this.router.navigate(['chamados']);
      }, ex => {
        this.snackBar.open(ex.error.error, "Fechar", {
          duration: 4000,
          panelClass: ["error-snackbar"],
        });
      })
    } else {
      this.chamadoService.create(this.chamado).subscribe(
        (resposta) => {
          this.snackBar.open("Chamado criado com sucesso", "Fechar", {
            duration: 4000,
            panelClass: ["success-snackbar"],
          });
          this.router.navigate(["chamados"]);
        },
        (ex) => {
          this.snackBar.open(ex.error.error, "Fechar", {
            duration: 4000,
            panelClass: ["error-snackbar"],
          });
        }
      );
    }
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe((resposta) => {
      this.chamado = resposta;
    }, ex => {
      this.snackBar.open(ex.error.error, "Fechar", {
        duration: 4000,
        panelClass: ["error-snackbar"],
      });
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacoes.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
}
