import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@app/services/userModel';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private http: HttpClient, private userService: UserService) {
        this.getUser();
    }

    getUser(): Observable<User> {
        // Add your code here
        return this.userService.getUser().pipe(
            switchMap((response: any) => {
                return of({name: response.name, isAdmin: response.isAdmin})
            }),
            tap(user => {
                this.name$$.next(user.name);
                this.isAdmin$$.next(user.isAdmin);
            }),
            catchError(error => {
                console.error('Error loading user', error);
                this.name$$.next('');
                this.isAdmin$$.next(false);
                throw error;
            })
        )
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
