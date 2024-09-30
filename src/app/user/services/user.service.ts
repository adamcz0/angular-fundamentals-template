import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
    
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    // Add your code here
    return this.http.get("http://localhost:4000/users/me").pipe(
      catchError(error => {
        console.error('Error fetching data', error);
        return of(null);
      })
    );
  }
}
