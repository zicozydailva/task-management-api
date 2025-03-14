export type AppResponse = {
  data: object;
  success: boolean;
  message: string;
};

export enum RequestHeadersEnum {
  Authorization = 'authorization',
  BusinessId = 'x-business-id',
}

export enum RequestMethodEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
