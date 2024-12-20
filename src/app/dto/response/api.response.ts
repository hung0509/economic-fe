// api-response.model.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ApiResponse<T> {
    code: number;
    message: string;
    result: T;
    constructor(code: number, message: string, result: T){
      this.code = code;
      this.message = message;
      this.result = result;
    }
}
  