import { Response } from 'express';
import { FeedbackService } from './feedback.service';
import { Observable } from 'rxjs';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAllExams(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<Feedback[]>;
    getExamById(id: string): Promise<Feedback>;
    createExam(exam: CreateFeedbackDTO): Promise<Feedback>;
    updateExam(id: string, exam: UpdateFeedbackDTO, res: Response): Promise<Feedback>;
    deleteFeedbackById(id: string, res: Response): Observable<Response>;
}
