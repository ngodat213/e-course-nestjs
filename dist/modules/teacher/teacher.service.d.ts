import { IService } from 'src/interfaces/service.interface';
import { Teacher } from './teacher.model';
import { Observable } from 'rxjs';
import { IDTO } from 'src/interfaces/dto.interface';
export declare class TeacherService implements IService<Teacher> {
    findAll(keyword?: string, skip?: Number, limit?: Number): Observable<Teacher[]>;
    findById(id: string): Observable<Teacher>;
    save(data: IDTO): Observable<Teacher>;
    update(id: string, data: IDTO): Observable<Teacher>;
    deleteAll(id: string): Observable<Teacher>;
    deleteById(id: string): Observable<Teacher>;
}
