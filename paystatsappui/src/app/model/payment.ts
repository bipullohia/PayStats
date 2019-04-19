export class Payment {
    payid:number;
    title:string;
    description:string;
    amount:number;
    dateOfTransaction:string;
    timestamp:string;
    paymentCategory:string;
    payType:string;
    paymentEntity:string;
    entityPaidTo:string;
}

export class Entities {
    eid:number;
    ename:string;
    category:string;
    description:string;
}
