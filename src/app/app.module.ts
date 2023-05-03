import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { DataTablesModule } from "angular-datatables"
import { HttpClientModule } from "@angular/common/http";
import { UpdateLeaveComponentComponent } from './components/update-leave-component/update-leave-component.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeUserComponent,
    UpdateLeaveComponentComponent,
    ManagerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
