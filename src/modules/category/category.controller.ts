import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Observable, map } from 'rxjs';
import { Category } from 'src/models/category.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';

@ApiTags('Category')
@Controller({path: 'categorys', scope: Scope.REQUEST})
export class CategoryController {
  constructor(private categoryService: CategoryService){}

  @Get('')
  getAllCategorys(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Category[]>{
    return this.categoryService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Category>{
    return this.categoryService.findById(id);
  }

  @Post('')
  createCategory(
    @Body() category: CreateCategoryDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.categoryService.save(category).pipe(
      map((category) => {
        return res
        .location('/categorys/' + category._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() category: UpdateCategoryDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.categoryService.update(id, category).pipe(
      map((category) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteCategoryById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.categoryService.deleteById(id).pipe(
      map((category) => {
        return res.status(204).send();
      }),
    );
  }
}
