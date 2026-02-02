import { BaseRepository } from "./base.repository";
import { ProductInterface, ProductModel } from "../schema/product.schema";

export class ProductRepository extends BaseRepository<ProductInterface> {
    constructor() {
        super(ProductModel);
    }
    
    async findByCategory(category: string): Promise<ProductInterface[]> {
        return this.model.find({ category });
    }
}
