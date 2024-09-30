import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject, catchError, finalize, Observable, tap, map, subscribeOn, of, switchMap} from 'rxjs';

interface Course {
    title: string,
    description: string,
    duration: number,
    authors: string[]
}

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
            map((response: any) => response.courses as Course[]),
            tap(courses => this.courses$$.next(courses)),
            catchError(error => {
                console.error('Error loading courses', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        )
        .subscribe();
    }

    createCourse(course: any) { // replace 'any' with the required interface
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

    getCourse(id: string) {
        // Add your code here
        this.setLoading(true);
        this.coursesService.getCourse(id).pipe(
            catchError(error => {
                console.error('Error loading course', error);
                throw error;
            }),
            finalize(() => this.setLoading(false))
        );
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
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
            switchMap((response: any) => {return of(response.courses as Course[]);
            }),
            tap(courses => this.courses$$.next(courses)),
            catchError(error => {
                console.error('Error filtering courses', error);
                return of([]);
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
    }

    getAllAuthors() {
        // Add your code here
        this.setLoading(true);
        this.coursesService.getAllAuthors().pipe(
            tap(authors => console.log('Authors: ', authors)),
            catchError(error => {
                console.error('Error loading authors', error);
                return [];
            }),
            finalize(() => this.setLoading(false))
        ).subscribe();
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

    getAuthorById(id: string) {
        // Add your code here
        this.setLoading(true);
        this.coursesService.getAuthorById(id).pipe(
            catchError(error => {
                console.error('Error creating author', error);
                throw error;
            })
        );
    }
}
