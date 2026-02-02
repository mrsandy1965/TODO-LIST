import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productData = req.body;
            // Basic validation could be added here manually if needed
            if (!productData.name || !productData.price || !productData.category) {
                 res.status(400).json({ success: false, message: "Missing required fields" });
                 return;
            }

            const product = await this.productService.createProduct(productData);
            res.status(201).json({ success: true, data: product });
        } catch (error: any) {
             res.status(500).json({ success: false, message: error.message });
        }
    }

    getProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id as string);
            if (!product) {
                res.status(404).json({ success: false, message: "Product not found" });
                return;
            }
            res.json({ success: true, data: product });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.productService.getAllProducts(req.query);
            res.json({ success: true, ...result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const product = await this.productService.updateProduct(id as string, updateData);
            if (!product) {
                res.status(404).json({ success: false, message: "Product not found" });
                return;
            }
            res.json({ success: true, data: product });
        } catch (error: any) {
             res.status(500).json({ success: false, message: error.message });
        }
    }

    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const product = await this.productService.deleteProduct(id as string);
            if (!product) {
                 res.status(404).json({ success: false, message: "Product not found" });
                 return;
            }
            res.json({ success: true, message: "Product deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
