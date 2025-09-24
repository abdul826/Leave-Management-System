import axios from "axios";

export const commonrequest = async (methods, url, body, header, auth) => {
  const admintoken = localStorage.getItem('adminToken');  
  // console.log(admintoken);
  const usertoken = localStorage.getItem('EmployeeToken');

  let config = {
    method: methods,
    url,
    headers: {},   // Initially header is empty
    data: body,    // always pass body
  };

  if (auth == "admin") {
    config.headers.Authorization = admintoken;
  } else if (auth == "user") {
    config.headers.Authorization = usertoken;

  }

  // Now we can set header
  if (header) {
    config.headers["Content-Type"] = "multipart/form-data";   // for image upload
  } else {
    config.headers["Content-Type"] = "application/json";    //  when we do not get header value
  }

  // console.log("config",config);

  // console.log(auth, usertoken);
  // console.log(config);

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error;
  }
};
