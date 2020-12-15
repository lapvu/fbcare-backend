import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as randomstring from "randomstring";
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { DeleteProductDto } from './dtos/DeleteProduct.dto';
import { GetProductDto } from './dtos/GetProduct.dto';
import { GetProductsDto } from './dtos/GetProducts.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { Product, ProductDocument } from './models/product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async createProduct(createProductDto: CreateProductDto, group_id: string): Promise<any> {
        const product_id = randomstring.generate({ length: 7, charset: 'numeric' });
        const product = await this.productModel.create({ ...createProductDto, _id: product_id, group_id });
        return product;
    }

    async getProduct(getProductDto: GetProductDto, group_id: string): Promise<any> {
        const product = await this.productModel.findOne({ _id: getProductDto.productId, group_id });
        return product;
    }

    async getProducts(getProductsDto: GetProductsDto, group_id: string): Promise<any> {
        const products = await this.productModel.find({ group_id })
            .skip(+getProductsDto.offset)
            .limit(+getProductsDto.limit)
            .sort({ "updatedAt": -1 });
        const total = await this.productModel.count({ group_id });
        return { products, total };
    }

    async updateProduct(updateProductDto: UpdateProductDto): Promise<any> {
        try {
            const done = await this.productModel.updateOne({ _id: updateProductDto._id }, updateProductDto);
            return done;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(deleteProductDto: DeleteProductDto, group_id: string): Promise<any> {
        try {
            const done = await this.productModel.deleteOne({ _id: deleteProductDto.productId, group_id })
            return done;
        } catch (error) {

        }
    }

    async searchProduct(query: string, group_id: string): Promise<any> {
        const products = await this.productModel.find({
            $or: [
                { product_name: { "$regex": query, "$options": "i" } },
                { _id: { "$regex": query, "$options": "i" } }
            ],
            group_id
        });
        return products;
    }

    async countProduct(group_id: string): Promise<any> {
        const total = await this.productModel.count({ group_id });
        return total;
    }
}
