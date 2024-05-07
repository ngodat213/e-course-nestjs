import { Response } from 'express';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
export declare class ExamHistoryController {
    private historyService;
    constructor(historyService: ExamHistoryService);
    getAllExamHistorys(keywordUser?: string, keywordExam?: string, limit?: number, skip?: number): Promise<ExamHistory[]>;
    getExamHistoryById(id: string): Promise<ExamHistory>;
    createExamHistory(courseOrder: CreateExamHistoryDTO): Promise<ExamHistory>;
    updateExamHistory(id: string, courseOrder: UpdateExamHistoryDTO, res: Response): Promise<ExamHistory>;
    deleteExamHistoryById(id: string, res: Response): Promise<ExamHistory>;
}
