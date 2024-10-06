import { Injectable } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustAll, exhaustMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as CoursesActions from './courses.actions'
import { CoursesStateFacade } from './courses.facade'
import { Route, Router } from '@angular/router';
import { Course } from '@app/services/userModel';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router) {}

    getAll$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            exhaustMap(() => this.coursesService.getAll()
                .pipe(
                    map(courses => ({type: CoursesActions.requestAllCoursesSuccess, payload: courses })),
                    catchError((error) => of(CoursesActions.requestAllCoursesFail({error: error.message})))
                ))
        ));

    filteredCourses$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            mergeMap(([action, allCourses]) => {
                const filteredCourses = allCourses?.filter((course) => 
                    course.title.includes(action.searchValue));
                return of(CoursesActions.requestFilteredCoursesSuccess({courses: filteredCourses}));
            }),
            catchError((error) =>
                of(CoursesActions.requestFilteredCoursesFail({error: error.message})))
        ));

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action) => this.coursesService.getCourse(action.id).pipe(
                map((course) => CoursesActions.requestSingleCourseSuccess({course})),
                catchError((error) => of(CoursesActions.requestSingleCourseFail({error: error.message})))
            ))
        ));

    deleteCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action) => this.coursesService.deleteCourse(action.id).pipe(
                map(() => CoursesActions.requestDeleteCourseSuccess()),
                catchError((error) => of(CoursesActions.requestDeleteCourseFail({error: error.message})))
            ))
        ));

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action) => this.coursesService.editCourse(action.id, action.course).pipe(
                map((course) => CoursesActions.requestEditCourseSuccess({course})),
                catchError((error) => of(CoursesActions.requestEditCourseFail({error: error.message})))
            ))
        ));

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action) => this.coursesService.createCourse(action.course).pipe(
                map((course) => CoursesActions.requestCreateCourseSuccess({course})),
                catchError((error) => of(CoursesActions.requestCreateCourseFail({error: error.message})))
            ))
        ));
    
    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CoursesActions.requestCreateCourseSuccess,
                CoursesActions.requestEditCourseSuccess,
                CoursesActions.requestSingleCourseFail
            ),
            map(() => this.router.navigate(['/courses']))
        ),
        {dispatch: false})
}
