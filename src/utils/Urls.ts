// Base Url
export const BASE_URL = 'https://ogmento-apis.azurewebsites.net/';

// User's Api's
export const getSignInUserDetailEndpoint = 'api/Users/GetUserDetail';
export const userDetailsEndpoint = `api/Users/Details`;
export const addUserEndpoint = 'api/Users/Add';
export const updateUserEndpoint = 'api/Users/Update';
export const deleteUserEndpoint = 'api/Users/Delete';
export const logOutEndpoint = 'api/Auth/logout';

// Sales Center Api's
export const salesCenterEndpoint = 'api/SalesCenter';
export const addSalesCenterEndpoint = 'api/SalesCenter/AddSalesCenter';
export const updateSalesCenterEndpoint =
  'api/SalesCenter/UpdateMainSalesCenter';
export const deleteSalesCenterEndpoint = 'api/SalesCenter/delete';

// Kiosk Api's
export const kioskEndpoint = 'api/Kiosk';
export const addKioskEndpoint = 'api/Kiosk/AddKiosk';
export const updateKioskEndpoint = 'api/Kiosk/update';
export const deleteKioskEndpoint = 'api/Kiosk/delete';

// category endpoint
export const categoryEndpoint = 'api/category';

// Product Api's
export const productDataEndpoint =
  'https://ogmento-apis.azurewebsites.net/api/product/all';
export const deletePictureEndpoint = 'api/Product/picture';
export const addUpdateProductEndpoint = '/api/product';

// Signage Api 's
export const getAdvertisementEndPoint = 'api/signage/ad';
export const addVideoEndPoint = 'api/signage/ad/chunk';

export const addAdvertisementEndPoint = 'api/signage/ad/data';

export const planogramDataEndpoint = 'api/planogram';
export const singleImage = 'api/product/picture';
