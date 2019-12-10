import { Subject, Observable, merge } from 'rxjs';
import { scan, map } from 'rxjs/operators';

type selectFn = <T, K>(state: T) => K;
type updateFn = <B, C>(value: B[]) => C;

export class Stream<U> {
    
    static for<U>() {
      const operations$: Subject<{update: updateFn, select: selectFn}> = new Subject();
      const stream = <Observable<U>>merge(operations$)
      .pipe(
        scan( (acc, curr:{update: updateFn, select: selectFn}) => {
          let appstate = acc;
          let sliceOfState = <any>curr.update(curr.select(acc));
          return <U>({...appstate, ...sliceOfState}); 
        }, <U>{} )
      );
      return new Stream<U>(stream, operations$); 
    }

    constructor(public stream: Observable<U>, private ops$: Subject<{update: updateFn, select: selectFn}>){}

    readSlice<D, K>(fn : any) {
      return new Stream<K>(<Observable<K>>this.stream.pipe(map(fn)), this.ops$); 
    }

    op( fnUpdate: any, fnSelect: any  );
    op( fnUpdate: updateFn, fnSelect: selectFn  ) {
        this.ops$.next( {update: fnUpdate, select: fnSelect} );
    }
}
