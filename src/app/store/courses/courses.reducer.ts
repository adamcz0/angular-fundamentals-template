import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '@app/services/userModel';
import * as CoursesActions from './courses.actions'

export const coursesFeatureKey = 'courses';

const defaultCourse: Course = {
    id: '',
    title: '',
    description: '',
    duration: 0,
    creationDate: '',
    authors: []
  };

export interface CoursesState {
    allCourses: Course[],
    course: Course | null,
    isAllCoursesLoading: boolean,
    isSingleCourseLoading: boolean,
    isSearchState: boolean,
    errorMessage: string
}

export const initialState: CoursesState = {
    allCourses: [],
    course: defaultCourse,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export const coursesReducer = createReducer(
    initialState,

    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
    })),

    on(CoursesActions.requestAllCoursesFail, (state, {error}) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({
        ...state,
        isSingleCourseLoading: false,
        course: course
    })),

    on(CoursesActions.requestSingleCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
        isSingleCourseLoading: false
    })),

    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, {courses}) => ({
        ...state,
        isSearchState: false,
        allCourses: courses || []
    })),

    on(CoursesActions.requestFilteredCoursesFail, (state, {error}) => ({
        ...state,
        isSearchState: false,
        errorMessage: error
    })),

    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
    })),

    on(CoursesActions.requestDeleteCourseFail, (state, {error}) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, {course}) => ({
        ...state,
        isSingleCourseLoading: false,
        course: course
    })),

    on(CoursesActions.requestEditCourseFail, (state, {error}) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, {course}) => ({
        ...state,
        isSingleCourseLoading: false,
        course: course
    })),

    on(CoursesActions.requestCreateCourseFail, (state, {error}) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
