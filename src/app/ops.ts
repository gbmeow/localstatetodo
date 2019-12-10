import {Todo} from './models';

export const addTodoOp = (todotitle : string) => (todos) => ({
    todos: [
        ...todos, {
            title: todotitle
        }
    ]
});

export const loadTodoOp = (vals : Todo[]) => x => ({
    ...x,
    todos: vals
});


export function loadTodo(vals : Todo[]) {
    return({todos: vals});
}

export function loadTodoOpe(vals : Todo[]) {
    return function (state) {
        return({
            ... state,
            todos: vals
        });
    }
}
