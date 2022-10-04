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
