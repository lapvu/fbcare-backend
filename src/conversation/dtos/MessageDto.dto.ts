export class MessageDto {
    recipient?: string;
    sender?: string;
    text?: string;
    time?: number;
    mid?: string;
    is_echo?: boolean;
}