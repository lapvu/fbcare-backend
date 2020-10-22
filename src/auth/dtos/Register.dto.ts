export class RegisterDto {
    email: string;
    displayName: string;
    phone: string;
    password: string;
    roles?: [string];
}