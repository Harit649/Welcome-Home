export interface SuccessResponse<T>{
    isError?: Boolean;
    message?: string;
    data: T;
}