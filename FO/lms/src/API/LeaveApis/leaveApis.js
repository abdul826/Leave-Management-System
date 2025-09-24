import { BASE_URL } from "../helper";
import { commonrequest } from "../commonrequest";

export const fetchAllLeaveData = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/fetchleave`,'',header,"admin");
}

export const addLeaveData = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/applyleave`,data,header,'admin');
}

export const updateLeaveData = async(data,header)=>{
    return await commonrequest('PUT',`${BASE_URL}/updateleavestatus/${data.id}`,{ status: data.status },header,'admin');
}

// Employee Section - Apply Leave
export const applyLeaveApi = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/applyleave`,data,header,'user');
}

export const employeeLeaveApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/fetchsingleleave`,'',header,"user");
}

export const fetchIndianLeaveAPi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/IndianHoliday`,'',header,"user");
}
