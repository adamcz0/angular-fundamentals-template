import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private sessionStorageService: SessionStorageService,
        private http: HttpClient
    ) {
        const token = this.sessionStorageService.getToken();
        this.isAuthorized$$.next(!!token);
    }

    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean>;

    private loginUrl = 'http://localhost:4000/api/login';
    private logoutUrl = 'http://localhost:4000/api/logout';
    private registerUrl = 'http://localhost:4000/api/register';


    login(user: {name: string, email: string, password: string}) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<{token: string}>(this.loginUrl, user).pipe(
            tap(response => {
                if (response && response.token) {
                    this.sessionStorageService.setToken(response.token);
                    this.isAuthorized$$.next(true);
                }
            })
        );
    }

    logout() {
        // Add your code here
        this.http.post(this.logoutUrl, {}).subscribe(() => {
            this.sessionStorageService.deleteToken();
            this.isAuthorized$$.next(false);
        });
        
    }

    register(user: {name: string, email: string, password: string}) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(this.registerUrl, user).pipe(
            tap(() => {
                this.isAuthorized$$.next(false);
            })
        );
    }

    get isAuthorized(): boolean {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();
    }

    set isAuthorized(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        // Add your code here
        return this.loginUrl;
    }
}
