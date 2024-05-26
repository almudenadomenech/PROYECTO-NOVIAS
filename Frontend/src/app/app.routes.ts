import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VestidosDetailComponent } from './vestidos-detail/vestidos-detail.component';
import { VestidosListComponent } from './vestidos-list/vestidos-list.component';
import { VestidosFormComponent } from './vestidos-form/vestidos-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

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
    {
        path: 'vestidos/create',
        component: VestidosFormComponent
    },
    {
        path:'booking',
        component: BookingFormComponent
    }
    
];
