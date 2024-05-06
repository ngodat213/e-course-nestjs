import { Response } from 'express';
import { Observable } from 'rxjs';
import { ExamService } from './exam.service';
import { Exam } from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
export declare class ExamController {
    private examService;
    constructor(examService: ExamService);
    getAllExams(keyword?: string, limit?: number, skip?: number): Promise<Exam[]>;
    getExamById(id: string): Promise<Exam>;
    createExam(exam: CreateExamDTO): Promise<Exam>;
    updateExam(id: string, exam: UpdateExamDTO, res: Response): Promise<Exam>;
    deleteExamById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfExam(id: string): Promise<ExamLesson[]>;
}
