import { BASE_URL } from "../helper";
import { commonrequest } from "../commonrequest";

// This is for Admin
export const fetchAllEmployee = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/fetchemp`,'',header,"admin");
}

export const addEmployeeData = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/register`,data,header,'admin');
}

export const deleteEmployeeData = async(data,header)=>{
    return await commonrequest('DELETE',`${BASE_URL}/deleteEmp/${data}`,{},header,'admin');
}