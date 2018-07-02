import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlocacaoRoutingModule } from "./alocacao.routing";
import { SharedModule } from '../../shared/shared.module';

import { AlocacaoComponent } from './alocacao.component';

@NgModule({
  imports: [
    CommonModule,
    AlocacaoRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [AlocacaoComponent]
})
export class AlocacaoModule { }