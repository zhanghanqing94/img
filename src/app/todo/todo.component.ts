import { Component, OnInit,Inject  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TodoService} from './todo.service'
import {Todo} from './todo.model';


@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  todos:Todo[]=[];
  desc:string='';

  constructor(@Inject("todoService") private service,
    private route: ActivatedRoute,
    private router: Router) {} 

  ngOnInit() {
    // this.getTodos();
    console.log(this.route.data)
    console.log(this.route.children)
    console.log(this.route.fragment)
    console.log(this.route.queryParams)
    console.log(this.route.url)
    console.log(this.route.params)
    this.route.params.forEach((params: Params) => {
      console.log(params)
      let filter = params['filter'];
      console.log(filter)
      this.filterTodos(filter);
    });
  }
  onTextChanges(value) {
    this.desc = value;
  }

   addTodo(){
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }
  // toggleTodo(todo: Todo) {
  //   const i = this.todos.indexOf(todo);
  //   this.service
  //     .toggleTodo(todo)
  //     .then(t => {
  //       this.todos = [
  //         ...this.todos.slice(0,i),
  //         t,
  //         ...this.todos.slice(i+1)
  //         ];
  //     });
  // }
  toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
        return null;
      });
  }
  // removeTodo(todo: Todo) {
  //   const i = this.todos.indexOf(todo);
  //   this.service
  //     .deleteTodoById(todo.id)
  //     .then(()=> {
  //       this.todos = [
  //         ...this.todos.slice(0,i),
  //         ...this.todos.slice(i+1)
  //       ];
  //     });
  // }
  removeTodo(todo: Todo): Promise<void>  {
    const i = this.todos.indexOf(todo);
    return this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }
   toggleAll(){
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }
  filterTodos(filter: string): void{
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }
  clearCompleted(){
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.service.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }
  // getTodos(): void {
  //   this.service
  //     .getTodos()
  //     .then(todos => this.todos = [...todos]);
  // }
}
