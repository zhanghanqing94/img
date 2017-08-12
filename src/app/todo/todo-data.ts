import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from './todo.model';
export class InMemoryTodoDbService implements InMemoryDbService{
    createDb(){
        let todos:Todo[]=[
            {
                id:"6e73ffa2-bf09-edfd-6a32-1995bd5c7a68",
                desc:"first",
                completed:false
            },
            {
                id:"3e591661-c368-1927-25a3-8b743eb6ae09",
                desc:"second",
                completed:true
            }
        ];
        return {todos};

    }
}