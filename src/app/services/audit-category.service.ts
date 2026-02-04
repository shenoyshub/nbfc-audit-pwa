import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuditCategory } from "../models/audit-category";

@Injectable({ providedIn: 'root' })
export class AuditCategoryService {
private api = '/api/audit-categories';


constructor(private http: HttpClient) {}


getAll() {
return this.http.get<AuditCategory[]>(this.api);
}


save(model: AuditCategory) {
return this.http.post(this.api, model);
}
}