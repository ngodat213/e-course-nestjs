import { Observable } from 'rxjs';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { Response } from 'express';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
export declare class ExamLessonController {
    private lessonService;
    constructor(lessonService: ExamLessonService);
    getAllLessons(keyword?: string, limit?: number, skip?: number): Observable<ExamLesson[]>;
    getLessonById(id: string): Observable<ExamLesson>;
    createLesson(lesson: CreateExamLessonDTO, res: Response): Observable<Response>;
    updateLesson(id: string, lesson: UpdateExamLessonDTO, res: Response): Observable<Response>;
    deleteLessonById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfLesson(id: string): Observable<ExamQuestion[]>;
}
