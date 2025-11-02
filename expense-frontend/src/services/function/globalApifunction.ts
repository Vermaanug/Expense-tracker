
import { createSearchParams } from "react-router-dom";
import apiRequestGlobal from "../../lib/axios.config"

interface IGetRequest {
  url: string;
  searchParams?: Record<string, any>; 
}

interface IPostRequest {
  url: string;
  data?: any;
}

const handleGlobalGetRequestQuery = ({
  url,
  searchParams = {},
}: IGetRequest) => {
  const searchParamsObject = createSearchParams(searchParams).toString();
  return apiRequestGlobal
    .get(url + "?" + searchParamsObject)
    .then((response) => response.data);
};

const handleGlobalPostRequest = ({ url, data }: IPostRequest) => {
  return apiRequestGlobal.post(url, data).then((response) => response.data);
};

const handleGlobalPutRequest = ({ url, data }: IPostRequest) => {
  return apiRequestGlobal.put(url, data).then((response) => response.data);
};

const handleGlobalDeleteRequest = ({ url, data }: IPostRequest) => {
  return apiRequestGlobal
    .delete(url, { data })
    .then((response) => response.data);
};

export {
  handleGlobalGetRequestQuery,
  handleGlobalDeleteRequest,
  handleGlobalPostRequest,
  handleGlobalPutRequest,
};