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
  id?:number;
  floor?:number;
  number?:number;
  rent?:number;
  owner?: UserProfile;
  tenants?:string[];

}

export interface Building {
  id:number;
  city:string;
  country:string;
  number:number;
  street:string;
  zipcode:number;

}

export interface  Person {
  id?: number;
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  picture?:string;
}
export interface UserProfile extends Person{
  roles: string[];
}

export interface UserProfileEdit {
  firstname?:string;
  lastname?:string;
  username?:string;
  password?:string
}
export interface TenantInfosInvit {
  firstname?:string;
  email?:string;
  lastname?:string;
  username?:string;
  password?:string
  location?:string;
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
  number: number;
  floor: number;
  rent: number;
  building?: string;
}


export interface  BuildingsOptions {
  uriId?: string,
  label?:string
}

// building details data


export interface BuildingDetails  {
  id?:number;
  city?:string;
  country?:string;
  number?:number;
  street?:string;
  zipcode?:number;
  advertisements?: Advertisement[];
  apartments?: BuildingDetailsApartment[];
  syndicate?: BuildingDetailsSyndicate;
  allMembers? :Person[];

}

export interface  Advertisement {
  id?:number;
  title?:string;
  publishedAt?:string;
  description?:string;
  price?:number;
  type?:string;
  pictures?: AdvertisementPicture[]
  owner?: UserProfile;
}
export interface  AdvertisementPicture {
  id?:number;
  file?:string;

}
export interface BuildingDetailsApartment {
  id?:number;
  floor?:number;
  number?:number;
  rent?:number;
  tenants?:string[] | Person[];
  owner?:string | Person;
}

export interface BuildingDetailsSyndicate {
  id?:number;
  name?:string;
  siren?:string;
  siret?:string;
  street?:string;
  street_number?:number;
  type?:string;
  users?:string[] | UserProfile;
}


export interface CurBuildingDetails{
  id?:number,
  label?: string
}

export interface PostAdvertisement {
  title?:string;
  description?:string;
  price?:number;
  type?:string;
  building?:string;
  owner?:string;
}
export interface Conversation {
  id?:number;
  participants?: UserProfile[];
  recipient?: UserProfile;
}

export interface Message {
  id?:number;
  from?: string;
  text?: string;
  picture?: string;
}
export interface UserMessage {
  id?:number;
  username?: string;
  message?: string;
  picture?: string;
}


