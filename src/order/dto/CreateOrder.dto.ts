export class CreateOrderDto {
    customer_id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    address: string;
    province: string;
    district: string;
    commune: string;
    amount: string;
    weight: string;
    payer: string;
    service: string;
    config: string;
    product_type: string;
    products: [
        {
            sku: string,
            name: string,
            price: number,
            weight: number,
            quantity: number
        }
    ]
}