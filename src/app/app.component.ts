import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Stream } from './stream';
import { Observable } from 'rxjs';

export interface GlobalState {
  todos: Todo[];
}

export interface Todos {
  todos: Todo[];
}

export interface Todo {
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  localState: Stream<GlobalState, Todos>;
  todos$: Observable<Todos>;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.localState = this.store.state.readSlice<GlobalState, Todos>(x => x.todos);
    this.todos$ = this.localState.stream; 
  }

  load() {
    const vals = [{title: 'watch mr.robot'}];
    this.localState.op( x => ({...x, todos: vals}) , (x) => x.todos);
  }

  add( todotitle: string ) {
    this.localState.op( (todos: Todos[]) => {
      return ({todos: [...todos, {title: todotitle }]});
     } , x => x.todos );
  }
}
