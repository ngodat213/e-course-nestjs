import { IService } from 'src/interfaces/service.interface';
import { Blog } from './blog.model';
import { Observable } from 'rxjs';
import { IDTO } from 'src/interfaces/dto.interface';
export declare class BlogService implements IService<Blog> {
    findAll(keyword?: string, skip?: Number, limit?: Number): Observable<Blog[]>;
    findById(id: string): Observable<Blog>;
    save(data: IDTO): Observable<Blog>;
    update(id: string, data: IDTO): Observable<Blog>;
    deleteAll(id: string): Observable<Blog>;
    deleteById(id: string): Observable<Blog>;
}
