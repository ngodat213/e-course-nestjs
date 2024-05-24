import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from 'src/modules/category/category.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { Observable, map } from 'rxjs';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Category')
@ApiBearerAuth()
@Controller({path: 'categorys', scope: Scope.REQUEST})
export class CategoryController {
  constructor(private categoryService: CategoryService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAllCategorys(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Category[]> {
    return this.categoryService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Category>{
    return this.categoryService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  createCategory(
    @Body() category: CreateCategoryDTO,
  ) {
    return this.categoryService.save(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async updateCategory(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() category: UpdateCategoryDTO,
  ) {
    return await this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  @Responser.handle('Delete category')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async deleteCategoryById(
    @Param('id', ParseObjectIdPipe) id: string ){
    return await this.categoryService.deleteById(id);
  }
}
