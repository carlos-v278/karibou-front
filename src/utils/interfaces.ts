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

export interface UserProfile {
  id?:number;
  email?:string;
  firstname?:string;
  lastname?:string;
  username?:string;
  picture?: string;
  roles: string[];
}

export interface UserProfileEdit {
  firstname?:string;
  lastname?:string;
  username?:string;
  password?:string
}

export interface OwnerInfosInvit {
  firstname?:string;
  email?:string;
  lastname?:string;
  username?:string;
  password?:string
  properties : OwnerInfosProperty[]
}
export interface OwnerInfosProperty{
  number?: undefined;
  floor?: undefined;
  rent?: undefined;
  building?: undefined;
}

export interface  filesRequest {
  content? : Blob | MediaSource ;
  requestUrl :string;
}


