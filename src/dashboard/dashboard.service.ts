import { Injectable } from '@nestjs/common';
import { NoteService } from 'src/note/note.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DashboardService {
    constructor(
        private userService: UserService,
        private noteSercie: NoteService,
        private productService: ProductService,
        private orderService: OrderService
    ) { }
    async getInfomation(user_id: string, group_id: string, roles: any): Promise<any> {
        const note = await this.noteSercie.countNote(group_id);
        const product = await this.productService.countProduct(group_id);
        const employee = await this.userService.countEmployee(group_id);
        const order = await this.orderService.countOrder(user_id, group_id, roles);
        return {
            note,
            product,
            employee,
            order
        };
    }
}
