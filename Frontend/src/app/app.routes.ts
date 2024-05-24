import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VestidosDetailComponent } from './vestidos-detail/vestidos-detail.component';
import { VestidosListComponent } from './vestidos-list/vestidos-list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'vestidos',
        component: VestidosListComponent
    },
    {
        path: 'vestidos/:id/detail',
        component: VestidosDetailComponent
    },
    
];
