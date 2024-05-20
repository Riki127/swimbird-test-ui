import { Routes } from '@angular/router';
import { TableComponent } from '../components/table/table.component';
import { HomepageComponent } from '../components/homepage/homepage.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'table', component: TableComponent },
    { path: '**', redirectTo: '' }
];
