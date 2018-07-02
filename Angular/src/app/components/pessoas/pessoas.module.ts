import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas.routing';
import { SharedModule } from '../../shared/shared.module';

import { PessoasComponent } from './pessoas.component';

@NgModule({
  imports: [
    CommonModule,
    PessoasRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [PessoasComponent],
})
export class PessoasModule { }
