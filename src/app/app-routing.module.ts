import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { UpdateLeaveComponentComponent } from './components/update-leave-component/update-leave-component.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';


const routes: Routes = [
{
  path: 'user-home',
  component: HomeUserComponent,
  pathMatch: 'full'
},
{
  path: 'update-leave',
  component: UpdateLeaveComponentComponent,
  pathMatch: 'full'
}, {
  path: 'manage-leaves',
  component: ManagerDashboardComponent,
  pathMatch: 'full'
}, 
  {
    path: '**',
    redirectTo: 'user-home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
