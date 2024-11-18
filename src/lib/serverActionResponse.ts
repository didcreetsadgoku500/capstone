export interface ServerActionResponse<T> {
    error?: string
    body?: T
}