import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './adminapp/admin-dashboard/admin-dashboard.component';
import { AddJobComponent } from './adminapp/add-job/add-job.component';
import { JobListComponent } from './adminapp/job-list/job-list.component';
import { AddstateComponent } from './adminapp/addstate/addstate.component';
import { AddcityComponent } from './adminapp/addcity/addcity.component';
import { AddindustryComponent } from './adminapp/addindustry/addindustry.component';
import { AddroleComponent } from './adminapp/addrole/addrole.component';
import { EditJobComponent } from './adminapp/edit-job/edit-job.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { ViewJobAppliedComponent } from './adminapp/view-job-applied/view-job-applied.component';
import { ViewStatusComponent } from './components/view-status/view-status.component';
import { AdminloginComponent } from './adminapp/adminlogin/adminlogin.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterformComponent,
    AdminDashboardComponent,
    AddJobComponent,
    JobListComponent,
    AddstateComponent,
    AddcityComponent,
    AddindustryComponent,
    AddroleComponent,
    EditJobComponent,
    LoginComponent,
    HomeComponent,
    ApplyJobComponent,
    ViewJobAppliedComponent,
    ViewStatusComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
