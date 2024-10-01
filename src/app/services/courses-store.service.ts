import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course } from './userModel';
import { BehaviorSubject, catchError, finalize, Observable, tap, map, subscribeOn, of, switchMap} from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    constructor(private coursesService: CoursesService) {}

    private courses$$ = new BehaviorSubject<Course[]>([]);
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public courses$: Observable<Course[]> = this.courses$$.asObservable();
    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    setLoading(value: boolean) {
        this.isLoading$$.next(value);
    }

    getAll(){
        // Add your code here
        this.setLoading(true);
        this.coursesService.getAll().pipe(
            switchMap((response: any) => {
                return of(response.result as Course[]);
            }),
            tap(courses => this.courses$$.next(courses)),
            catchError(error => {
                console.error('Error loading courses', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        )
        .subscribe();
    }

    createCourse(course: Course) { 
        // Add your code here
        this.setLoading(true);
        this.coursesService.createCourse(course).pipe(
            tap(() => this.getAll()),
            catchError(error => {
                console.error('Error creating course', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    getCourse(id: string): Observable<Course> {
        // Add your code here
        this.setLoading(true);
        return this.coursesService.getCourse(id).pipe(
            switchMap((response: any) => {
                return of(response.result as Course);
            }),
            catchError(error => {
                console.error('Error loading course', error);
                throw error;
            }),
            finalize(() => this.setLoading(false))
        );
    }

    editCourse(id: string, course: Course) { 
        // Add your code here
        this.setLoading(true);
        this.coursesService.editCourse(id, course).pipe(
            tap(() => this.getAll()),
            catchError(error => {
                console.error('Error editing course', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    deleteCourse(id: string) {
        // Add your code here
        this.setLoading(true);
        this.coursesService.deleteCourse(id).pipe(
            tap(() => this.getAll()),
            catchError(error => {
                console.error('Error deleting course', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    filterCourses(value: string): void {
        // Add your code here
        this.setLoading(true);
        this.coursesService.filterCourses(value).pipe(
            switchMap((response: any) => {
                return of(response.result as Course[]);
            }),
            tap(courses => this.courses$$.next(courses)),
            catchError(error => {
                console.error('Error filtering courses', error);
                return of([]);
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    getAllAuthors(): Observable<string> {
        // Add your code here
        this.setLoading(true);
        return this.coursesService.getAllAuthors().pipe(
            switchMap((response: any) => {
                return of(response.result)
            }),
            tap(authors => console.log('Authors: ', authors)),
            catchError(error => {
                console.error('Error loading authors', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        );
    }

    createAuthor(name: string) {
        // Add your code here
        this.setLoading(true);
        this.coursesService.createAuthor(name).pipe(
            tap(() => this.getAllAuthors()),
            catchError(error => {
                console.error('Error creating author', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    getAuthorById(id: string): Observable<string> {
        // Add your code here
        this.setLoading(true);
        return this.coursesService.getAuthorById(id).pipe(
            switchMap((response: any) => {
                return of(response.result.name as string)
            }),
            catchError(error => {
                console.error('Error creating author', error);
                throw error;
            })
        );
    }
}
