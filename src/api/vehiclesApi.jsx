import axios from "axios";

export const VehiclesApi = {
  getAllVehicles: () => {
    return axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/passenger vehicle?format=json')
      .then( result => result.data.Results )
  },
  getModels: (make, year) => {
    return axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`)
      .then( result => result.data.Results);
  }
}