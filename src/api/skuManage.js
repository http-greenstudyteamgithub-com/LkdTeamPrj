// by xh
import request from '@/utils/request'

// 商品类型搜索
export const skuClassSearchApi = ({ pageIndex, pageSize, className }) => {
  return request({
    url: '/api/vm-service/skuClass/search',
    params: {
      pageIndex, pageSize, className
    }
  })
}

//  新增商品类型
export const newProductClassApi = (className) => {
  return request({
    url: '/api/vm-service/skuClass',
    method: 'POST',
    data: {
      className
    }
  })
}

// 删除商品类型
export const deltClassApi = (classId) => {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })
}

// 修改商品类型
export const editClassApi = (classId, newClassName) => {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: 'PUT',
    data: {
      className: newClassName
    }
  })
}

// 商品搜索
export const getShopSearchListApi = (params) => {
  return request({
    url: '/api/vm-service/sku/search',
    params
  })
}

// 新增商品
export const newProductApi = ({ skuName, price, brandName, unit, classId, skuImage
}) => {
  return request({
    url: '/api/vm-service/sku',
    method: 'POST',
    data: {
      skuName, price, brandName, unit, classId, skuImage
    }
  })
}

// 上传图片
export const uploadImgApi = (fileName) => {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    data: {
      fileName
    }
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}

// 商品数据导入
export const shopDataImportApi = () => {
  return request({
    url: '/api/vm-service/sku/upload',
    method: 'POST'
  })
}

export const editShopApi = (data) => {
  return request({
    url: `/api/vm-service/sku/${data.skuId}`,
    method: 'PUT',
    data
  })
}
