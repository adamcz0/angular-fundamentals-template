import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
    
  constructor(private http: HttpClient) {}

  getUser() {
    // Add your code here
    return this.http.get("http://localhost:4000/api/users/me");
  }
}
