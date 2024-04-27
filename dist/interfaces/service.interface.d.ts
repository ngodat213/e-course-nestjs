import { Observable } from "rxjs";
import { IDTO } from "./dto.interface";
export interface IService<T> {
    findAll(keyword?: string, skip?: Number, limit?: Number): Observable<T[]>;
    findById(id: string): Observable<T>;
    save(data: IDTO): Observable<T>;
    update(id: string, data: IDTO): Observable<T>;
    deleteAll(id: string): Observable<T>;
    deleteById(id: string): Observable<T>;
}
