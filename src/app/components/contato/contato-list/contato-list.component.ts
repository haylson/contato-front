import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css']
})
export class ContatoListComponent implements OnInit {

  contato: Contato = {
    id:    '',
    nome:      '',
    sobrenome: '',
    cpf:       '',
    email:     ''
  }

  ELEMENT_DATA: Contato[] = []

  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'cpf', 'email', 'editar', "deletar"];
  dataSource = new MatTableDataSource<Contato>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ContatoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {

      resposta.forEach((contato) => {
        contato.cpf = this.formatarCPF(contato.cpf);
      });

      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Contato>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatarCPF(cpf: string): string {
    const somenteDigitos = cpf.replace(/\D/g, '');
    return somenteDigitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }


}
