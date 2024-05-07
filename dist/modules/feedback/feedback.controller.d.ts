import { Response } from 'express';
import { FeedbackService } from './feedback.service';
import { Observable } from 'rxjs';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAllFeedbacks(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<Feedback[]>;
    getFeedbackById(id: string): Promise<Feedback>;
    createFeedback(value: CreateFeedbackDTO): Promise<Feedback>;
    updateFeedback(id: string, value: UpdateFeedbackDTO, res: Response): Promise<Feedback>;
    deleteFeedbackById(id: string, res: Response): Observable<Response>;
}
