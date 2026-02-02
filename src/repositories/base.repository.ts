import { Model, Document, UpdateQuery } from 'mongoose';
import mongoose from 'mongoose';

export interface SearchParams {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    [key: string]: any;
}

export abstract class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findAll(filter: any = {}): Promise<T[]> {
        return await this.model.find(filter);
    }

    async update(id: string, data: mongoose.UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }

    async findWithQuery(params: SearchParams) {
        const { search, page = 1, limit = 10, sort = 'createdAt', order = 'desc', ...filters } = params;
        
        const skip = (page - 1) * limit;
        const sortOptions: any = { [sort]: order === 'desc' ? -1 : 1 };

        let query: any = { ...filters };

        if (search) {
            query = {
                ...query,
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ] as any
            };
        }

        const data = await this.model.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await this.model.countDocuments(query);

        return {
            data,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
