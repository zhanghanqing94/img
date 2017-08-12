import { Component, OnInit,Inject } from '@angular/core';
import { IMultiSelectOption,IMultiSelectTexts ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '../domain/entities';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username='';
  password=''
   auth: Auth;
//    optionsModel: number[];
//   myOptions: IMultiSelectOption[];
//   mySettings: IMultiSelectSettings = {
//     enableSearch: true,
//     checkedStyle: 'glyphicon',//'checkboxes', 'glyphicon' or 'fontawesome'
//     buttonClasses: 'btn btn-default btn-block',
//     dynamicTitleMaxItems: 3,
//     displayAllSelectedText: true,
//     showCheckAll: true,
//     showUncheckAll: true,
//     closeOnSelect: false,
//     autoUnselect: true,
//     // selectionLimit:2
// };
//   myTexts: IMultiSelectTexts = {
//     checkAll: 'Select all',
//     uncheckAll: 'Unselect all',
//     checked: 'item selected',
//     checkedPlural: 'items selected',
//     searchPlaceholder: 'Find',
//     defaultTitle: 'Select',
//     allSelected: 'All selected',
// };
// object:any;
  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
    // this.myOptions = [
    //     // { id: 1, name: 'Car brands', isLabel: true },
    //     { id: 2, name: 'Volvo', parentId: 1 },
    //     { id: 3, name: 'Honda', parentId: 1 },
    //     { id: 4, name: 'BMW', parentId: 1 },
    //     // { id: 5, name: 'Colors', isLabel: true },
    //     { id: 6, name: 'Blue', parentId: 5 },
    //     { id: 7, name: 'Red', parentId: 5 },
    //     { id: 8, name: 'White', parentId: 5 }
    //     ];
    // this.object={
    //     // fileFormat:"jpg",
    //     // value:"http://www.hzwitwin.com/images/footer_bg_02.jpg"
    //     fileFormat:"mp4",
    //     value:"http://www.hzwitwin.com/video/%E5%AE%A3%E4%BC%A0%E7%89%87.mp4"
    // }
        
  }
  // onChange() {
  //       console.log(this.optionsModel);
       
  //   }
  login(){
    console.log(this.username +":"+ this.password)
    console.log(this.service.loginServe(this.username,this.password))
  }
  submit(formValue){
    this.service
      .loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        console.log(auth)
        let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
        if(!auth.hasError){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

  // getElement(value){
  //   alert(value)
  // }
}
