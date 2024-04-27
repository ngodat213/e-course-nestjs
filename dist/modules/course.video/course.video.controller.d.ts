import { CourseVideoService } from './course.video.service';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
export declare class CourseVideoController {
    private videoService;
    constructor(videoService: CourseVideoService);
    getAllVideos(keyword?: string, limit?: number, skip?: number): Observable<CourseVideo[]>;
    getCourseById(id: string): Observable<CourseVideo>;
    createCourse(video: CreateCourseVideoDTO, res: Response): Observable<Response>;
    updateCourse(id: string, video: UpdateCourseVideoDTO, res: Response): Observable<Response>;
    deleteCourseById(id: string, res: Response): Observable<Response>;
}
