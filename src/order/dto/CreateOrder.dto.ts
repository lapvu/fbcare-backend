export class CreateOrderDto {
    customer_id: string;
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    address: string;
    province: string;
    district: string;
    commune: string;
    amount: string;
    weight: string;
    note: string;
    products: any;
}