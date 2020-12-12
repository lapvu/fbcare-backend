import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Request, UseGuards } from '@nestjs/common';
import { query } from 'express';
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
        return this.productSerivce.createProduct(createProductDto, req.user.group_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProducts(@Query() getProductsDto: GetProductsDto, @Request() req): Promise<any> {
        return this.productSerivce.getProducts(getProductsDto, req.user.group_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/search")
    async searchProducts(@Query() query: any, @Request() req) {
        return this.productSerivce.searchProduct(query.q, req.user.group_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":productId")
    async getProduct(@Param() getProductDto: GetProductDto, @Request() req): Promise<any> {
        return this.productSerivce.getProduct(getProductDto, req.user.group_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":productId")
    async deleteProduct(@Param() deleteProductDto: DeleteProductDto, @Request() req): Promise<any> {
        return this.productSerivce.deleteProduct(deleteProductDto, req.user.group_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":productId")
    async updateProduct(@Body() updateProductDto: UpdateProductDto): Promise<any> {
        return this.productSerivce.updateProduct(updateProductDto);
    }

}
