import { Injectable } from '@angular/core';
import { Stream } from './stream';
import { GlobalState } from './models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  readonly state: Stream<GlobalState> = Stream.for();
}
