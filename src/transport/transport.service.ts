import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from "axios";
import { SaveSettingDto } from './dtos/SaveSetting.dto';
import { Transport, TransportDocument } from './models/transport.model';

@Injectable()
export class TransportService {
    constructor(@InjectModel(Transport.name) private transportModel: Model<TransportDocument>) { }

    async saveSetting(saveSettingDto: SaveSettingDto, user_id: string): Promise<any> {
        const transport = await this.transportModel.updateOne({ user_id }, saveSettingDto, { upsert: true });
        return transport;
    }

    async getSetting(user_id: string): Promise<any> {
        const transport = await this.transportModel.findOne({ user_id });
        return transport;
    }

    async registerHook(access_token: string): Promise<any> {
        try {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            }
            const res = await axios.post("https://api.mysupership.vn/v1/partner/webhooks/create", {
                url: "http://172.105.214.160/webhook"
            }, headers);
            console.log(res)
            if (res.status === 200 && res.data.status === "Success") return true;
        } catch (error) {
            console.log(error)
        }
    }
}
