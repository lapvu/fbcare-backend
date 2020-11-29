import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { DeleteProductDto } from './dtos/DeleteProduct.dto';
import { GetProductDto } from './dtos/GetProduct.dto';
import { GetProductsDto } from './dtos/GetProducts.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { Product, ProductDocument } from './models/product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async createProduct(createProductDto: CreateProductDto, userId: string): Promise<any> {
        const product = await this.productModel.create({ ...createProductDto, userId });
        return product;
    }

    async getProduct(getProductDto: GetProductDto, userId: string): Promise<any> {
        const product = await this.productModel.findOne({ _id: getProductDto.productId, userId });
        return product;
    }

    async getProducts(getProductsDto: GetProductsDto, userId: string): Promise<any> {
        const products = await this.productModel.find({ userId }).skip(+getProductsDto.offset).limit(+getProductsDto.limit);
        const total = await this.productModel.count({ userId });
        return { products, total };
    }

    async updateProduct(updateProductDto: UpdateProductDto): Promise<any> {
        try {
            const done = await this.productModel.updateOne({ _id: updateProductDto._id }, {
                productName: updateProductDto.productName,
                productDesc: updateProductDto.productDesc,
                image: updateProductDto.image,
                quantity: +updateProductDto.quantity,
                price: +updateProductDto.price,
            });
            return done;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(deleteProductDto: DeleteProductDto, userId: string): Promise<any> {
        try {
            const done = await this.productModel.deleteOne({ _id: deleteProductDto.productId, userId })
            return done;
        } catch (error) {

        }
    }
}
