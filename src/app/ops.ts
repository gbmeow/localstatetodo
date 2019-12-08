import { Todo } from './app.component';


export const addTodoOp = (todotitle: string)=> (todos) => ({todos: [...todos, {title: todotitle }]});
export const loadTodoOp = (vals: Todo[]) => x => ({...x, todos: vals}); 

