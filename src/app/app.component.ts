import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Stream } from './stream';
import { Observable } from 'rxjs';
import { addTodoOp, loadTodoOp } from './ops';
import { Todos, GlobalState } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  localState: Stream<Todos>;
  todos$: Observable<Todos>;
  todos: Todos;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.localState = this.store.state.readSlice<GlobalState, Todos>(x => x.todos);
    this.todos$ = this.localState.stream;
    this.todos$.subscribe( 
      res => this.todos = res
    ); 
  }

  load() {
    this.localState.op( loadTodoOp([{title: 'watch mr.robot'}]), x => x.todos);
  }

  add( todotitle: string ) {
    this.localState.op( addTodoOp(todotitle), x => x.todos );
  }
}
