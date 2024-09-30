import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

interface Course {
    title: string,
    description: string,
    duration: number,
    authors: string[]
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient) {}

    private baseCoursesUrl = 'http://localhost:4000/courses';
    private baseAuthorsUrl = 'http://localhost:4000/authors';

    getAll() {
        // Add your code here
       return this.http.get(`${this.baseCoursesUrl}/all`)
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${this.baseCoursesUrl}/add`, course)
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`${this.baseCoursesUrl}/${id}`, course);
    }

    getCourse(id: string) {
        // Add your code here
        return this.http.get(`${this.baseCoursesUrl}/${id}`);
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`${this.baseCoursesUrl}/${id}`);
    }

    filterCourses(value: string): Observable<any> {
        // Add your code here
        return this.http.get(`http://localhost:4000/courses/filter?${value}`).pipe(
            catchError(error => {
                console.error('Error filtering courses', error);
                return of([]);
            })
        );
    }

    getAllAuthors() {
        // Add your code here
        return this.http.get(`${this.baseAuthorsUrl}/all`);
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post(`${this.baseAuthorsUrl}/add`, name);
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.http.get(`${this.baseAuthorsUrl}/${id}`);
    }
}
