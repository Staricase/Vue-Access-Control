import instance from './index';
const preUrlPath = '/admin';
//获取账户列表
const request = {
  p: ['post,/accounts'],
  r: params => {
    // return instance.get(`${preUrlPath}/accounts`, { params })
    return instance.post(`${preUrlPath}/page`, params)
  }
}

const addAdmin = {
  p: ['post,/accounts/**'],
  r: params => {
//{name:, fullName, password,}
    return instance.post(`${preUrlPath}/add`, params)
  }
}

//删除账户
const remove = {
  p: ['post,/account/**'],
  r: params => {
    return instance.post(`${preUrlPath}/delete`, params)
  }
};

//修改账户
const edit = {
  p: ['post,/account/**'],
  r: params => {
    return instance.post(`${preUrlPath}/update`, params)
  }
};
//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, { params })
  }
}

export {
  request,
  addAdmin,
  remove,
  edit,
  notAllowed
}
