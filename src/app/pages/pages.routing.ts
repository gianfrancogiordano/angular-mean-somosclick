import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { RolComponent } from './mantenimientos/roles/rol.component';

const routes: Routes = [

    {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        component: PagesComponent,
        children: [

            { path: '', canActivate: [], component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'usuario/:id', canActivate: [AdminGuard], component: UsuarioComponent, data: { titulo: 'Usuario' } },

            { path: 'roles', canActivate: [AdminGuard], component: RolesComponent, data: { titulo: 'Roles' } },
            { path: 'role/:id', canActivate: [AdminGuard], component: RolComponent, data: { titulo: 'Role' } },

            // settings
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuraciones' } },
        ]
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }