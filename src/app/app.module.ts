import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { AppRoutingModule } from './/app-routing.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { CkeditorComponent } from './ck/ckeditor/ckeditor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CkeditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TodoModule,
    MultiselectDropdownModule,
    CoreModule
  ],
  providers: [
    {provide: 'auth',  useClass: AuthService},
      { provide: 'user', useClass: UserService },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
