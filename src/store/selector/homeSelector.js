// 获得首页的标题
export const getName = (state) => state.home.title

// 获得首页的分类数据
export const getCate = (state) => state.home.cateList

// 获得首页的筛选商家条件的数据
export const getSort = (state) => state.home.selectData.sortList
export const getMultifilter = (state) => state.home.selectData.multifilterList
export const getFilterPrices = (state) => state.home.selectData.filterPrices

// 获得首页商家的列表数据
export const getSellerList = (state)=>state.home.sellerList