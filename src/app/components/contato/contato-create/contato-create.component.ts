import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato-create',
  templateUrl: './contato-create.component.html',
  styleUrls: ['./contato-create.component.css']
})
export class ContatoCreateComponent implements OnInit {

  contato: Contato = {
    id:    '',
    nome:      '',
    sobrenome: '',
    cpf:       '',
    email:     ''
  }

  nome: FormControl =  new FormControl(null, [Validators.minLength(3),Validators.maxLength(100), Validators.required]);
  sobrenome: FormControl =  new FormControl(null, [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  cpf: FormControl =       new FormControl(null, [Validators.minLength(3), Validators.maxLength(11), Validators.required]);
  email: FormControl =        new FormControl(null, [Validators.email, Validators.minLength(3), Validators.maxLength(100), Validators.required]);

  constructor(
    private service: ContatoService,
    private toast:    ToastrService,
    private router:          Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.contato).subscribe(() => {
      this.toast.success('Contato cadastrado com sucesso', 'Cadastro');
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

  validaCampos(): boolean {
    return this.nome.valid && this.sobrenome.valid
     && this.cpf.valid && this.email.valid
  }

}
