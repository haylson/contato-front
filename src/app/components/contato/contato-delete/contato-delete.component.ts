import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato-delete',
  templateUrl: './contato-delete.component.html',
  styleUrls: ['./contato-delete.component.css']
})
export class ContatoDeleteComponent implements OnInit {

  contato: Contato = {
    id:    '',
    nome:      '',
    sobrenome: '',
    cpf:       '',
    email:     ''
  }

  constructor(
    private service: ContatoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.contato.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.contato.id).subscribe(resposta => {
      this.contato = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.contato.id).subscribe(() => {
      this.toast.success('Contato deletado com sucesso', 'Delete');
      this.router.navigate(['contatos'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

}
