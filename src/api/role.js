import instance from './index';
const preUrlPath = '';
const ROLE_SUPER = 2;
const ROLE_ADMIN = 1;

//获取角色列表
const request = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/roles`, {params})
  }
};
//删除角色
const remove = {
  p: ['delete,/role/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/role/${params.id}`)
  }
};
//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, {params})
  }
}

export {
  request,
  remove,
  notAllowed,
  ROLE_SUPER,
  ROLE_ADMIN,
}
