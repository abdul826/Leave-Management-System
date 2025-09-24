import { BASE_URL } from "../helper";
import { commonrequest } from "../commonrequest";

export const EmployeeLoginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/login`,data,header,"user");
}

export const EmployeeverifyApi = async(header)=>{  // for get method we don not need data because we don't send any data
    return await commonrequest("GET",`${BASE_URL}/verifyEmp`,'',header,"user");
}


