import { Response } from 'express';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category.model/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategorys(keyword?: string, limit?: number, skip?: number): Observable<Category[]>;
    getCategoryById(id: string): Observable<Category>;
    createCategory(category: CreateCategoryDTO, res: Response): Observable<Response>;
    updateCategory(id: string, category: UpdateCategoryDTO, res: Response): Observable<Response>;
    deleteCategoryById(id: string, res: Response): Observable<Response>;
}
