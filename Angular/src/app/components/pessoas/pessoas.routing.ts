import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PessoasComponent } from './pessoas.component';

const pessoasRoutes: Routes = [
    {
        path: '',
        component: PessoasComponent,
        children: []
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(pessoasRoutes)
    ],
    providers: [],
    exports: [
        RouterModule,
    ]
})

export class PessoasRoutingModule { }