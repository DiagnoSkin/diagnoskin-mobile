export interface User {
    uid: string;
    name: string;
    email: string;
}

export interface Credential {
    email: string;
    password: string;
}

export interface BodyPart{
    name : string,
    col: string,
    row: string,
    colSpan: string,
    rowSpan: string,
    selected: boolean
}