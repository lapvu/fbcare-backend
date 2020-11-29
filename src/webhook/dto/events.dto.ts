export class EventsHookPayloadDto {
    object: string;
    entry: [Entry]
}

export class Entry {
    id?: string;
    time?: number;
    messaging?: [Messaging]
}

export class Messaging {
    sender?: {
        id: string
    };
    recipient?: {
        id: string
    };
    timestamp?: number;
    message?: Message
}

export class Message {
    mid?: string;
    is_echo?: boolean;
    text?: string;
}