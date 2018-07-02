import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes  , RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {path:'Pessoa', loadChildren: './components/pessoas/pessoas.module#PessoasModule'},
    {path:'Alocacao', loadChildren: './components/alocacao/alocacao.module#AlocacaoModule'},
    {path:'Tarefas', loadChildren: './components/tarefas/tarefas.module#TarefasModule'},
    {path:'' , redirectTo:'/Pessoa' , pathMatch:'full'},
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    exports: [
        RouterModule,
    ]
})

export class AppRoutingModule {}