export class Alert {
    id?: string;
    type?: AlertType;
    message?: string;
    
    constructor(data:any) {
        this.id = data.id;
        this.type = data.type;
        this.message = data.message;
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
