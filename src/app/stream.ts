import { Subject, Observable, merge, of, ReplaySubject } from 'rxjs';
import { scan, map } from 'rxjs/operators';

type GenericObject = { [key: string]: any };
type selectFn = <T extends GenericObject, K>(state: T) => K;
type updateFn = <B extends GenericObject, C>(value: B[]) => C;


export class Stream<U, C> {
    
    static for<U, C>() {
      const operations$: Subject<{update: updateFn, select: selectFn}> = new Subject();
      const stream = <Observable<U>>merge(operations$)
      .pipe(
        scan( (acc, curr:{update: updateFn, select: selectFn}) => {
          let appstate = acc;
          let sliceOfState = <any>curr.update(curr.select(acc));
          return Object.assign({}, appstate, sliceOfState); 
        }, {} )
      );
      return new Stream<U, C>(stream, operations$); 
    }

    constructor(public stream: Observable<U>, private ops$: Subject<{update: updateFn, select: selectFn}>){}

    readSlice<D, K>(fn : selectFn) {
      return new Stream<D, K>(<Observable<D>>this.stream.pipe(map(fn)), this.ops$); 
    }
    op( fnUpdate: any, fnSelect: selectFn );
    op( fnUpdate: updateFn, fnSelect: selectFn ) {
        this.ops$.next( {update: fnUpdate, select: fnSelect} );
    }
}