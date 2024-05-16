import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseVideoService } from './course.video.service';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Responser } from 'src/decorators/responser.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from 'src/decorators/api.file.decorator';

@ApiTags('Course Video')
@ApiBearerAuth()
@Controller({path: 'course/videos', scope: Scope.REQUEST})
export class CourseVideoController {
  constructor(private videoService: CourseVideoService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAllCourseVideos(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<CourseVideo[]> {
    return this.videoService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCourseVideoById(@Param('id', ParseObjectIdPipe)id : string) : Promise<CourseVideo>{
    return this.videoService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  createCourseVideo(
    @Body() video: CreateCourseVideoDTO,
  ) {
    return this.videoService.save(video);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  updateCourseVideo(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() video: UpdateCourseVideoDTO,
  ) :Promise<CourseVideo>{
    return this.videoService.updateById(id, video);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteCourseVideoById(
    @Param('id', ParseObjectIdPipe) id: string,
  ){
    return this.videoService.deleteById(id);
  }
}
