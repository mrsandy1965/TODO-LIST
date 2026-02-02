import { ProductRepository } from "../repositories/product.repository";
import { ProductInterface } from "../schema/product.schema";
import { SearchParams } from "../repositories/base.repository";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(data: Partial<ProductInterface>) {
        return await this.productRepository.create(data);
    }

    async getProductById(id: string) {
        return await this.productRepository.findById(id);
    }

    async getAllProducts(params: SearchParams) {
        return await this.productRepository.findWithQuery(params);
    }

    async updateProduct(id: string, data: Partial<ProductInterface>) {
        return await this.productRepository.update(id, data);
    }

    async deleteProduct(id: string) {
        return await this.productRepository.delete(id);
    }
}
