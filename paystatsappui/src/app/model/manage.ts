export class PaymentCategory {
    categoryId:number;
    categoryName:string;
    timestamp:string;
    selected: boolean;
}

export class PaymentEntity {
    entityId:number;
    entityName:string;
    timestamp:string;
    selected: boolean;
}

export class PaymentMode {
    paymodeId:number;
    paymodeName:string;
    timestamp:string;
    selected: boolean;
}

export class Filter{
    filterType: string;
    filterName: string;
    filterValues: string[];
}