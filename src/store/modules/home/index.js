import {SET_CATE_DATA, SET_SELECT_DATA, SET_SELLER_LIST_DATA} from './actionTypes'
const initialState = {
    title: '首页',
    cateList: [],
    selectData: {},
    sellerList: []
}
const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_CATE_DATA:
            return {...state, cateList: action.data};
        case SET_SELECT_DATA:
            return {...state, selectData: action.data};
        case SET_SELLER_LIST_DATA: 
            return {...state, sellerList: action.data}
        default:
            return state;
    }
    
}
export default reducer;