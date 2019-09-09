import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Event {
    key: any;
    data?: any;
}

export class EventManager {
    private _eventBrodcaster: Subject<Event>;

    constructor() {
        this._eventBrodcaster = new Subject<Event>();
    }

    broadcast(key: any, data?: any) {
        this._eventBrodcaster.next({ key, data });
    }

    on<T>(key: any): Observable<any> {
        return this._eventBrodcaster
            .asObservable()
            .pipe(filter(event => event.key === key))
            .pipe(map(event => <T>event.data));
    }
}
