import instance from './index';
const preUrlPath = 'adminFruit';
//商品列表
const request = {
  p: ['post,/goods'],
  r: params => {
    return instance.post(`${preUrlPath}/list`, params)
  }
};
//删除商品
const remove = {
  p: ['post,/goods/**'],
  r: params => {
    return instance.post(`${preUrlPath}/delete`, params)
  }
};

const edit = {
  p: ['post,/goods/**'],
  r: params => {
    return instance.post(`${preUrlPath}/update`, params)
  }
}
const add_good = {
  p: ['post,/goods/**'],
  r: params => {
    return instance.post(`${preUrlPath}/add`, params)
  }
}

const importFile = {
  p: ['post,/goods/**'],
  r: params => {
    return instance.post(`${preUrlPath}/importExcel`, params, {
      headers: {
        post: {
          "Content-Type": "multipart/form-data",
        }
      }
    })
  }
}

//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, { params })
  }
}

export {
  request,
  remove,
  edit,
  add_good,
  importFile,
  notAllowed
}
