import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
