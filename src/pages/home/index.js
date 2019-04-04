import {connect} from 'react-redux'
import UI from './UI'
import {getCateData, getSelectorData, getSellerListData} from '../../store/modules/home/actions'
import {getName, getCate, getSort, getMultifilter, getFilterPrices, getSellerList} from '../../store/selector/homeSelector'



const mapStateToProps = (state)=>({
  name: getName(state),
  cateList: getCate(state),
  sort: getSort(state),
  multifilter: getMultifilter(state),
  filterPrices: getFilterPrices(state),
  sellerList: getSellerList(state)
})

const mapDispatchToProps = (dispatch)=>({
  getCateData: ()=>dispatch(getCateData()),
  getSelectorData: ()=>dispatch(getSelectorData()),
  getSellerListData: (option)=>dispatch(getSellerListData(option))
})

export default connect(mapStateToProps, mapDispatchToProps)(UI);