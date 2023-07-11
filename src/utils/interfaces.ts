export  interface UserAuth{
  email?:string;
  password?:string;

}

export interface NavLinks {
  to?:string;
  name?:string;
  size?:string;
  icon?:string;
}

export interface Apartment {
  id:number;
  floor:number;
  number:number;
  rent:number;
  building:Building[];
}

export interface Building {
  id:number;
  city:string;
  country:string;
  number:number;
  street:string;
  zipcode:number;

}

export interface User {
  id:number;
  email:string;
  firstname:string;
  lastname:number;
  username:string;
  zipcode:number;

}

export type ExtUser<T> = T & User;
