import { Response } from 'express';
import { Observable } from 'rxjs';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
export declare class ExamHistoryController {
    private historyService;
    constructor(historyService: ExamHistoryService);
    getAllExamHistorys(keyword?: string, limit?: number, skip?: number): Observable<ExamHistory[]>;
    getExamHistoryById(id: string): Observable<ExamHistory>;
    createExamHistory(history: CreateExamHistoryDTO, res: Response): Observable<Response>;
    updateExamHistory(id: string, history: UpdateExamHistoryDTO, res: Response): Observable<Response>;
    deleteExamHistoryById(id: string, res: Response): Observable<Response>;
}
