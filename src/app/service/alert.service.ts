import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';


import { Alert, AlertType } from '../dto/response/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>(); // Dùng để phát ra thông báo
    private defaultId = 'default-alert';

    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    success(message: string) {
        this.alert(new Alert({ type: AlertType.Success, message }));
    }

    error(message: string) {
        this.alert(new Alert({type: AlertType.Error, message }));
    }

    info(message: string) {
        this.alert(new Alert({type: AlertType.Info, message }));
    }

    warn(message: string) {
        this.alert(new Alert({type: AlertType.Warning, message }));
    }

    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }
}