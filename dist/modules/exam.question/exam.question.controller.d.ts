import { Response } from 'express';
import { ExamQuestionService } from './exam.question.service';
import { ExamQuestion } from 'src/models/exam.question.model/exam.question.model';
import { Observable } from 'rxjs';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
export declare class ExamQuestionController {
    private questionService;
    constructor(questionService: ExamQuestionService);
    getAllQuestions(keyword?: string, limit?: number, skip?: number): Observable<ExamQuestion[]>;
    getQuestionById(id: string): Observable<ExamQuestion>;
    createQuestion(video: CreateExamQuestionDTO, res: Response): Observable<Response>;
    updateQuestion(id: string, video: UpdateExamQuestionDTO, res: Response): Observable<Response>;
    deleteQuestionById(id: string, res: Response): Observable<Response>;
}
