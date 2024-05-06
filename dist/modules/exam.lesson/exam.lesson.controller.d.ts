import { Observable } from 'rxjs';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { Response } from 'express';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
export declare class ExamLessonController {
    private lessonService;
    constructor(lessonService: ExamLessonService);
    getAllCourseLessons(keyword?: string, limit?: number, skip?: number): Promise<ExamLesson[]>;
    getCourseLessonById(id: string): Promise<ExamLesson>;
    createCourseLesson(lesson: CreateExamLessonDTO): Promise<ExamLesson>;
    updateCourseLesson(id: string, lesson: UpdateExamLessonDTO): Promise<ExamLesson>;
    deleteLessonById(id: string, res: Response): Observable<Response>;
    getAllExamOfLesson(id: string): Promise<ExamQuestion[]>;
}
