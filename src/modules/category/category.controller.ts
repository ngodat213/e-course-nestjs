import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Observable, map, merge, mergeMap } from 'rxjs';
import { Category } from 'src/modules/category/category.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { HttpBadRequestError } from 'src/errors/bad-request.error';
import { Responser } from 'src/decorators/responser.decorator';

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
    return this.categoryService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Category>{
    return this.categoryService.findById(id);
  }

  @Post('')
  @Responser.handle('Create category')
  createCategory(
    @Body() category: CreateCategoryDTO,
  ) {
    return this.categoryService.save(category);
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
