import { Response } from 'express';
import { ExamQuestionService } from './exam.question.service';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { Observable } from 'rxjs';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
export declare class ExamQuestionController {
    private questionService;
    constructor(questionService: ExamQuestionService);
    getAllExams(keyword?: string, limit?: number, skip?: number): Promise<ExamQuestion[]>;
    getExamById(id: string): Promise<ExamQuestion>;
    createExam(exam: CreateExamQuestionDTO): Promise<ExamQuestion>;
    updateExam(id: string, exam: UpdateExamQuestionDTO, res: Response): Promise<ExamQuestion>;
    deleteQuestionById(id: string, res: Response): Observable<Response>;
}
