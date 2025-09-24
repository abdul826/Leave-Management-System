import { BASE_URL } from "../helper";
import { commonrequest } from "../commonrequest";

export const fetchAllDepartment = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/fetchDepartment`,'',header,"admin");
}

export const addDepartmentData = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/addDepartment`,data,header,'admin');
}

export const deleteDepartmentData = async(data,header)=>{
    return await commonrequest('DELETE',`${BASE_URL}/deleteDep/${data}`,{},header,'admin');
}