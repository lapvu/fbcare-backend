export class RegisterDto {
    email: string;
    display_name: string;
    phone: string;
    password: string;
    roles?: [string];
}