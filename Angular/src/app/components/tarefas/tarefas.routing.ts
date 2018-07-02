import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TarefasComponent } from './tarefas.component';

const tarefasRoutes: Routes = [
    {
        path: '',
        component: TarefasComponent,
        children: []
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(tarefasRoutes)
    ],
    providers: [],
    exports: [
        RouterModule,
    ]
})

export class TarefasRoutingModule { }