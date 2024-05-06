import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from 'src/modules/category/category.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Category')
@Controller({path: 'categorys', scope: Scope.REQUEST})
export class CategoryController {
  constructor(private categoryService: CategoryService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  getAllCategorys(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Category[]> {
    console.log(keyword);
    return this.categoryService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Category>{
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
  ) :Promise<Category>{
    return this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  deleteCategoryById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Promise<Category>{
    return this.categoryService.deleteById(id);
  }
}
