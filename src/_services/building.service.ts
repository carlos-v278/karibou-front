import Axios from './caller.service'
import { BuildingDetails, BuildingDetailsApartment} from 'src/utils/interfaces';

const  getBuildingDetails = async <T extends BuildingDetails[] , Y>(buildingId : Y):Promise<T | null> =>{
 if (buildingId != undefined){
   return await Axios.get('/api/buildings/' + buildingId);
 }
 return null
}

const  getApartmentDetails = async <T extends BuildingDetailsApartment[] , Y>(apartmentId : Y):Promise<T | null> =>{
  if (apartmentId != undefined){
    return await Axios.get('/api/apartments/' + apartmentId);
  }
  return null
}

export const buildingService: {
  getBuildingDetails: <T extends BuildingDetails[] , Y >(number :Y) => Promise<T | null>;
  getApartmentDetails: <T extends BuildingDetailsApartment[] , Y >(apartmentId :Y) => Promise<T | null>;


} ={
  getBuildingDetails,
  getApartmentDetails

}
