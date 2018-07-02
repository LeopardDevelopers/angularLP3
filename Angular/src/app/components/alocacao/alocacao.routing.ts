import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AlocacaoComponent } from './alocacao.component';

const alocacaoRoutes: Routes = [
    {
        path: '',
        component: AlocacaoComponent,
        children: []
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(alocacaoRoutes)
    ],
    providers: [],
    exports: [
        RouterModule,
    ]
})

export class AlocacaoRoutingModule { }