import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';
import { Observable } from 'rxjs';
import { Course } from '@app/services/userModel';



@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    constructor(private store: Store) {}

    isAllCoursesLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isAllCoursesLoadingSelector);
    isSingleCourseLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isSingleCourseLoadingSelector);
    isSearchingState$: Observable<boolean> = this.store.select(CoursesSelectors.isSearchingStateSelector);
    courses$: Observable<{allCourses: Course[], course: Course | null}> = this.store.select(CoursesSelectors.getCourses);
    allCourses$: Observable<Course[]> = this.store.select(CoursesSelectors.getAllCourses);
    course$: Observable<Course | null> = this.store.select(CoursesSelectors.getCourse);
    errorMessage$: Observable<string> = this.store.select(CoursesSelectors.getErrorMessage);

    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({id}))
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({searchValue}))
    }

    editCourse(body: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({course: body, id}))
    }

    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({course: body}))
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({id}))
    }
}
