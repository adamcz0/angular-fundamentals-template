import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanLoad {
    // Add your code here
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isAuthorized) {
            return true;
        }
        return this.router.createUrlTree(['/courses']);
    }
}
