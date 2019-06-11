import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

const appRoutes: Routes = [
    { path: '', component: EmployeeComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
