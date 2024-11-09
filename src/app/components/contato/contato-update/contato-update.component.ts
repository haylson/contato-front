import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato-update',
  templateUrl: './contato-update.component.html',
  styleUrls: ['./contato-update.component.css']
})
export class ContatoUpdateComponent implements OnInit {

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

  update(): void {
    this.service.update(this.contato).subscribe(() => {
      this.toast.success('Contato atualizado com sucesso', 'Update');
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
