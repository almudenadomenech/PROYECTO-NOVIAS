import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VestidosDetailComponent } from './vestidos-detail/vestidos-detail.component';
import { VestidosListComponent } from './vestidos-list/vestidos-list.component';
import { VestidosFormComponent } from './vestidos-form/vestidos-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
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
        path: 'vestidos/:id/update',
        component: VestidosFormComponent
    },
    {
        path:'booking',
        component: BookingListComponent
    },
    {
        path: 'booking/:id/detail',
        component: BookingDetailComponent
    },
    {
        path: 'booking/:id/form',
        component: BookingFormComponent
    },
    {
        path: 'categories/:id/detail',
        component: CategoryDetailComponent
      },
    {
        path: 'user',
        component: UserListComponent
    },
    {
        path: 'user/:id/detail',
        component: UserDetailComponent
    },
    {
        path: 'user/profile',
        component: UserProfileComponent
    },
    {
        path: 'user/:id/profile',
        component: UserProfileComponent
    },
    {
        path: 'account',
        component: AccountFormComponent
    },
    {
        path: 'account/avatar',
        component: AvatarFormComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path:'category/:id',
        component: CategoryComponent
    }
    
];
