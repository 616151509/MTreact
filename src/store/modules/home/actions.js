import {api, fetch} from '../../../ajax'
import {SET_CATE_DATA, SET_SELECT_DATA, SET_SELLER_LIST_DATA} from './actionTypes'

// 设置首页的分类状态
const setCateData = (data)=>(
    {
        type: SET_CATE_DATA,
        data
    }
)

// 请求首页的分类数据
export const getCateData = ()=>(
    async (dispatch)=>{
        let result = await fetch.post(api.HOME_CATE_API, 
            {
                initialLat: 22.694199,
                initialLng: 113.793501,
                actualLat: 22.694112,
                actualLng: 113.793411,
                geoType: 2,
                wm_latitude: 22694199,
                wm_longitude: 113793501,
                wm_actual_latitude: 22694112,
                wm_actual_longitude: 113793411,
            }
        );
        let newData = result.data.kingkongList;
        let action = setCateData(newData);
        dispatch(action);
    }
)

const setSelectData = (data)=>(
    {
        type: SET_SELECT_DATA,
        data
    }
)

// 请求首页的筛选商家的数据
export const getSelectorData = ()=>(
    async (dispatch)=>{
        let result = await fetch.post(api.HOME_SELECT_API,
            {
                geoType: 2,
                wm_latitude: 22694199,
                wm_longitude: 113793501,
                wm_actual_latitude: 22694112,
                wm_actual_longitude: 113793411
            }
        );
        let action = setSelectData({
            sortList: result.data.sortVOList,
            filterPrices: result.data.filterPrices,
            multifilterList: result.data.multifilterVOList
        });
        dispatch(action);
    }
)


const setSellerListData = (data)=>(
    {
        type: SET_SELLER_LIST_DATA,
        data
    }
)
// 请求首页商家数据 
export const getSellerListData = (option = {})=>(
    async (dispatch)=>{
        let {sortId,multiFilterIds,sliderSelectMin,sliderSelectMax } = option;
        // 请求数据
        let result = await fetch.get(api.HOME_SELLER_LIST_API,
            {
                startIndex: 0,
                sortId: sortId?sortId:0,
                multiFilterIds: multiFilterIds?multiFilterIds:'',
                sliderSelectCode: '',
                sliderSelectMin: (sliderSelectMin+'')?sliderSelectMin:'',
                sliderSelectMax: sliderSelectMax?sliderSelectMax:'',
                geoType: 2,
                rankTraceId: '',
                wm_latitude: 22663011,
                wm_longitude: 113815770,
                wm_actual_latitude: 22663011,
                wm_actual_longitude: 113815770,
                _token: ''
            });
            let action = setSellerListData(result.data.shopList);
            dispatch(action);
    }
)