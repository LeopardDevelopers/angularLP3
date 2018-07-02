import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { PessoaService } from './core/service/rest/pessoas.service';
import { TarefasService } from './core/service/rest/tarefas.service';
import { AlocacaoService } from './core/service/rest/alocacao.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TarefasService,
    PessoaService,
    AlocacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
