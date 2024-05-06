/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { User } from '../user/user.model';
export declare class CourseService {
    private courseModel;
    private teacherModel;
    private courseLessonModel;
    private req;
    constructor(courseModel: Model<Course>, teacherModel: Model<User>, courseLessonModel: Model<CourseLesson>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    save(data: CreateCourseDTO): Promise<Course>;
    updateById(id: string, Course: UpdateCourseDTO): Promise<Course>;
    deleteAll(): Promise<any>;
    deleteById(id: string): Observable<Course>;
    lessonsOf(id: string): Promise<CourseLesson[]>;
}
