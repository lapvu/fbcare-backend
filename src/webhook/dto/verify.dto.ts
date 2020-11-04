export class VerifyWebhookDto {
    "hub.mode": string;
    "hub.challenge": string;
    "hub.verify_token": string;
}