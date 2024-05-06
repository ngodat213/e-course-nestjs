import { CourseVideoService } from './course.video.service';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
export declare class CourseVideoController {
    private videoService;
    constructor(videoService: CourseVideoService);
    getAllCourseVideos(keyword?: string, limit?: number, skip?: number): Promise<CourseVideo[]>;
    getCourseVideoById(id: string): Promise<CourseVideo>;
    createCourseVideo(video: CreateCourseVideoDTO): Promise<CourseVideo>;
    updateCourseVideo(id: string, video: UpdateCourseVideoDTO): Promise<CourseVideo>;
    deleteCourseVideoById(id: string): Promise<CourseVideo>;
}
