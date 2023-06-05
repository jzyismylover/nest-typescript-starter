/**
 * 封装统一返回格式
 */

interface ResponseData<T> {
  data: T;
  code: number;
  msg: string;
}

export function mappingJSONResponse<T>(response: Partial<ResponseData<T>>) {
  const _response = {};
  const { code = 0, data, msg } = response;
  _response['code'] = code;
  data && (_response['data'] = data);
  msg && (_response['msg'] = msg);
  return _response;
}

export function mappingJSONError() {}
