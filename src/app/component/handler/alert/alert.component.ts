import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../../../dto/response/alert.model';
import { AlertService } from '../../../service/alert.service';
import { CommonModule } from '@angular/common';

@Component({ 
    selector: 'app-alert', 
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';

    alerts: Alert[] = [];
    alertSubscription?: Subscription;
    routeSubscription?: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnDestroy(): void {
        this.alertSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
    }
    ngOnInit(): void {
        this.alertSubscription = this.alertService.onAlert(this.id)
        .subscribe(alert => {
            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), 1000);      
       });
       this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this.alertService.clear(this.id);
        }
    });
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
        }, 1000);
    }

    remove(alert: Alert) {
        // check if already removed to prevent error on auto close
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) return;
    
        const classes = ['alert', 'alert-dismissible'];
                
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }
    
        if(alert.type !== undefined)
            classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }
    
}