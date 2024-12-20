// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ValidationService {

//   constructor() { }

//   //Không được trống
//   InValidString(str: string): string{
//     if(str === null || str === "")
//       return 'border-danger';
//     return 'border-success';
//   }

//   //email hợp lệ
//    isValidEmail(email: string): string {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
//     return emailPattern.test(email) ? 'border-success' :'border-danger' ;
//   }

//   isValidDate(dateString: string): string { 
//     const date = new Date(dateString); 
//     return date instanceof Date && !isNaN(date.getTime()) ? 'border-success' :'border-danger' ; 
//   }

//   isMatch(str1:string, str2:string):string{
//     return( str1 === str2 && str1 !== null && str1.trim() !== "" ) ? 'border-success' :'border-danger' ;
//   }
// }
