import { Response } from 'express';
import { FeedbackService } from './feedback.service';
import { Observable } from 'rxjs';
import { Feedback } from 'src/models/feedback.model/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAllFeedbacks(keyword?: string, limit?: number, skip?: number): Observable<Feedback[]>;
    getFeedbackById(id: string): Observable<Feedback>;
    createFeedback(feedback: CreateFeedbackDTO, res: Response): Observable<Response>;
    updateFeedback(id: string, ceedback: UpdateFeedbackDTO, res: Response): Observable<Response>;
    deleteFeedbackById(id: string, res: Response): Observable<Response>;
}
