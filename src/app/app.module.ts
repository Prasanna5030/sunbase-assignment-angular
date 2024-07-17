import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { HeaderComponent } from './Layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MaterialModule } from './shared/material-module';
import { tokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { RouteGuardService } from './services/route-guard.service';
import {authInterceptorInterceptor} from './auth-interceptor.interceptor';

import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './Layout/full/full.component';
import { ConfirmationComponent } from './material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './material-component/dialog/change-password/change-password.component';

import { MenuItems } from './shared/menu-items';



import { ManageUserComponent } from './material-component/manage-user/manage-user.component';
import { UserComponent } from './material-component/user/user.component';




const ngxUILoaderConfig: NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"7b1fa2",
  fgsType:SPINNER.threeStrings,
  fgsSize:100,
  hasProgressBar:false
}

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,

    DashboardComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    ErrorComponent,
    ForgotpasswordComponent,
    SidebarComponent,
    FullComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
   


    ManageUserComponent,
    UserComponent,

   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUILoaderConfig)
    
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),

  
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    MenuItems
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
