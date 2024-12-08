import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { AdminDashboardComponent } from './adminapp/admin-dashboard/admin-dashboard.component';
import { AddJobComponent } from './adminapp/add-job/add-job.component';
import { JobListComponent } from './adminapp/job-list/job-list.component';
import { AddstateComponent } from './adminapp/addstate/addstate.component';
import { AddcityComponent } from './adminapp/addcity/addcity.component';
import { AddroleComponent } from './adminapp/addrole/addrole.component';
import { AddindustryComponent } from './adminapp/addindustry/addindustry.component';  
import { LoginComponent } from './components/login/login.component';
import { EditJobComponent } from './adminapp/edit-job/edit-job.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { ViewJobAppliedComponent } from './adminapp/view-job-applied/view-job-applied.component';
import { ViewStatusComponent } from './components/view-status/view-status.component';
import { AdminloginComponent } from './adminapp/adminlogin/adminlogin.component';
const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterformComponent },
  { path: 'admins', component :AdminDashboardComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'job-list', component: JobListComponent },
  { path: 'add-state', component: AddstateComponent },
  { path: 'add-city', component: AddcityComponent },
  { path: 'add-role', component: AddroleComponent },
  {path: 'add-industry', component: AddindustryComponent},
  { path: 'handlelogin', component: LoginComponent },
  { path: 'edit-job/:jobId', component: EditJobComponent },
  {path:'home',component:HomeComponent},
  {path:'apply/:id',component:ApplyJobComponent},
  { path: 'view-job-applied', component: ViewJobAppliedComponent },
  {path:'view-status',component:ViewStatusComponent},
  {path:'adminlogin',component:AdminloginComponent},
  { path: 'admins', redirectTo: '/adminlogin', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
