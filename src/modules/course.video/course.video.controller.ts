import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { CourseVideoService } from './course.video.service';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Course Video')
@Controller({path: 'course/videos', scope: Scope.REQUEST})
export class CourseVideoController {
  constructor(private videoService: CourseVideoService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
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
  createCourseVideo(
    @Body() video: CreateCourseVideoDTO,
  ) {
    return this.videoService.save(video);
  }

  @Put(':id')
  updateCourseVideo(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() video: UpdateCourseVideoDTO,
  ) :Promise<CourseVideo>{
    return this.videoService.updateById(id, video);
  }

  @Delete(':id')
  deleteCourseVideoById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseVideo>{
    return this.videoService.deleteById(id);
  }
}
