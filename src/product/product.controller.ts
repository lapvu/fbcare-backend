import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { DeleteProductDto } from './dtos/DeleteProduct.dto';
import { GetProductDto } from './dtos/GetProduct.dto';
import { GetProductsDto } from './dtos/GetProducts.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productSerivce: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @Request() req): Promise<any> {
        return this.productSerivce.createProduct(createProductDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProducts(@Query() getProductsDto: GetProductsDto, @Request() req): Promise<any> {
        return this.productSerivce.getProducts(getProductsDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":productId")
    async getProduct(@Param() getProductDto: GetProductDto, @Request() req): Promise<any> {
        return this.productSerivce.getProduct(getProductDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":productId")
    async deleteProduct(@Param() deleteProductDto: DeleteProductDto, @Request() req): Promise<any> {
        return this.productSerivce.deleteProduct(deleteProductDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":productId")
    async updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<any> {
        return this.productSerivce.updateProduct(updateProductDto);
    }
}
