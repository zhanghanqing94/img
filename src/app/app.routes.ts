import { RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {CkeditorComponent} from './ck/ckeditor/ckeditor.component';
// import {TodoComponent} from './todo/todo.component'
export const routes: Routes=[
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'todo',
        redirectTo:'todo/ALL'
      },
      {
        path:'ck',
        component:CkeditorComponent
      }
];
export const routing= RouterModule.forRoot(routes);