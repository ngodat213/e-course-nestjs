import { Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from 'src/modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategorys(keyword?: string, limit?: number, skip?: number): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category>;
    createCategory(category: CreateCategoryDTO): Promise<Category>;
    updateCategory(id: string, category: UpdateCategoryDTO, res: Response): Promise<Category>;
    deleteCategoryById(id: string, res: Response): Promise<Category>;
}
