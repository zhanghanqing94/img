import { Component, OnInit,Input,Output,EventEmitter,ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { IMultiSelectOption,IMultiSelectTexts ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { CkeditorComponent} from '../../ck/ckeditor/ckeditor.component';
@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue:string="";
 
  @Input() placeholder:string="What needs to be done?";
  @Input() delay: number = 300;

  //detect the input value and output this to parent
  @Output() textChanges = new EventEmitter<string>();
  //detect the enter keyup event and output this to parent
  @Output() onEnterUp = new EventEmitter<boolean>();

  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',//'checkboxes', 'glyphicon' or 'fontawesome'
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true,
    closeOnSelect: false,
    autoUnselect: true,
    // selectionLimit:2
};
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
};
  constructor(private elementRef: ElementRef) { 
     const event$ = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .debounceTime(this.delay)
      .distinctUntilChanged();
    event$.subscribe(input => this.textChanges.emit(input));
  }

  ngOnInit() {
    
  }
  onChange() {
        console.log(this.optionsModel);
    }
enterUp(){
    this.onEnterUp.emit(true);
    this.inputValue = '';
  }
}
