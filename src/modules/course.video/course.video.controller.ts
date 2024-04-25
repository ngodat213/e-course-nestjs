import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { CourseVideoService } from './course.video.service';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { CourseVideo } from 'src/models/course.video.model/course.video.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Video')
@Controller({path: 'course/videos', scope: Scope.REQUEST})
export class CourseVideoController {
  constructor(private videoService: CourseVideoService){}

  @Get('')
  getAllVideos(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<CourseVideo[]>{
    return this.videoService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getCourseById(@Param('id', ParseObjectIdPipe)id : string) : Observable<CourseVideo>{
    return this.videoService.findById(id);
  }

  @Post('')
  createCourse(
    @Body() video: CreateCourseVideoDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.videoService.save(video).pipe(
      map((video) => {
        return res
        .location('/videos' + video._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateCourse(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() video: UpdateCourseVideoDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.videoService.update(id, video).pipe(
      map((video) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteCourseById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.videoService.deleteById(id).pipe(
      map((video) => {
        return res.status(204).send();
      }),
    );
  }
}
