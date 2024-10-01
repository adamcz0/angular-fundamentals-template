export interface Course {
    title: string,
    description: string,
    duration: number,
    authors: string[],
    creationDate: string,
    id: string
}

export interface User {
    name: string,
    isAdmin: boolean
}