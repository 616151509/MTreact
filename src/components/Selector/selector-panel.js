import React, { Component } from "react";
import "./selector.scss";

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort1: props.sort.filter(item => item.position === 0),
      sort2: props.sort.filter(item => item.position === 1),
      showSort2: false,
      showMultSort: false,
      multOptions: {},
      slectNum: 0
    };
  }

  render() {
    let { multifilter, filterPrices, selectSort: sortOption, num } = this.props;
    // let sortOption = selectSort;

    // 构建人均价的选择数据
    let filter = {
      filterItemList: [
        {name: "20元以下", filterId: "1", icon: "", minVal: filterPrices[0].minPrice, maxVal: 20},
        {name: "20-40元", filterId: "2", icon: "", minVal: 20, maxVal: 40},
        {name: "40元以上", filterId: "3", icon: "", minVal: 40, maxVal: filterPrices[0].maxPrice},
      ],
      type: 0,
      groupTitle: '人均价',
      isSupportMultiChoice: 0
    };
    let filters = multifilter.slice(0, 2);
    filters.push(filter);

    let { sort1, sort2, showMultSort, showSort2, slectNum } = this.state;
    let listDOM = null;
    

    if (sort1 && multifilter && filterPrices) {
      let isFirst = sortOption && sortOption.position === 1;
      // 显示的列表
      listDOM = [
        <li
          key={-1}
          className="selector-item"
          onClick={this.showSelectSortAction}
          style={{ fontWeight: isFirst ? "bold" : "normal" }}
        >
          {isFirst ? sortOption.name : "综合排序"}
        </li>,

        ...sort1.map(item => {
          let style = {};
          if (sortOption) {
            style = {
              fontWeight: sortOption.sortId === item.sortId ? "bold" : "normal"
            };
          }
          return (
            <li
              className="selector-item"
              key={item.sortId}
              style={style}
              onClick={() => this.selectSortAction(item)}
            >
              {item.name}
            </li>
          );
        }),

        <li
          className="selector-item"
          key={-2}
          onClick={this.showMultSortAction}
        >
          筛选 {num ? <span>{num}</span> : ''}
        </li>
      ];
    }

    return (
      <div className="panel">
        {/* 遮罩层 */}
        {(showMultSort || showSort2) && <div className="cover" onClick={()=>{
            this.setState({
              showMultSort: false,
              showSort2: false
            })
          }}/>}

        <div className="panel-content">

          <ul className="seller-selector">{listDOM}</ul>

          {/* 点击第一个排序，才显示的选选择列表 */}
          {showSort2 && (
            <ul className="list1">
              {sort2.map(item => {
                let style = {};
                if (sortOption) {
                  style =
                    sortOption.sortId === item.sortId
                      ? { fontWeight: "bold", color: "#ffb000" }
                      : {};
                }
                return (
                  <li
                    className="item border-bottom"
                    key={item.sortId}
                    style={style}
                    onClick={() => this.selectSortAction(item)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}
          {/* 点击最后一个排序，才显示的选选择列表 */}
          {showMultSort && (
            <div className="list2">
              <div className='mult-wrap'>
                {
                  filters.map(item=>{
                    return this.getMultDOM(item, 'item1');
                  })
                }
                {this.getMultDOM(multifilter[multifilter.length-1], 'item2')}
              </div>
              <div className="btns border-top">
                <div className="btn" onClick={this.clearMultAction}>清除筛选</div>
                <div className="btn" onClick={this.finishMultAction}>完成 {slectNum ? <span>{slectNum}</span> : ''}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 获得筛选条件的dom
  getMultDOM = (data, flag)=>{
    return (
      <div className="border-bottom mult" key={data.groupTitle}>
        <p className="mult-title">{data.groupTitle}</p>
        <ul className="mult-list">
          {
            data.filterItemList.map(item=>{
              //控制样式
              let className = '';
              if(data.isSupportMultiChoice){
                className = item.selected&&'active';
              }else{
                let selectOption = this.state.multOptions[data.type];
                if(selectOption && selectOption.filterId === item.filterId){
                  className = 'active';
                }
              }
              //展示选项
              return (
                <li key={item.filterId} className={`mult-${flag} ${className}`}
                  onClick={()=>this.selectFilterAction(data, item)}>
                  <div className="">
                    {item.icon && <img alt="" src={item.icon}/>}
                    <p>{item.name}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  


  // 切换第一个下拉菜单
  showSelectSortAction = () => {
    this.setState({
      showMultSort: false,
      showSort2: !this.state.showSort2
    });
  };
  // 切换最后一个下拉菜单
  showMultSortAction = () => {
    this.setState({
      showMultSort: !this.state.showMultSort,
      showSort2: false
    });
  };

  // 排序方式的点击事件
  selectSortAction = item => {
    //   收起选择面板
    this.setState({
      showMultSort: false,
      showSort2: false
    });
    //将数据告诉父组件
    this.props.onSelectSort(item);
  };

  // 筛选条件的点击事件
  selectFilterAction = (data, item)=>{
    let multOptions = {...this.state.multOptions};
    let value = multOptions[data.type];
    //支持多选还未选择
    if(!value && data.isSupportMultiChoice){
      multOptions[data.type] = [item];
      item.selected = true;
    }
    //支持多选，已经选择过数据    
    else if(value && data.isSupportMultiChoice){
      //先判断选中的值是否是已经选择的
      let index = value.findIndex(val=>{
        return val.filterId === item.filterId;
      });
      if(index >= 0){
        value.splice(index, 1);
        multOptions[data.type] = value;
        item.selected = false;

      }else{
        multOptions[data.type] = [...value, item];
        item.selected = true;
      }
      
    }
    //不支持多选
    else{
      //没有选过
      if(!multOptions[data.type]){
        multOptions[data.type] = item;
      }
      // 已经选过
      else if(multOptions[data.type].filterId !== item.filterId){
        //替换选中的
        multOptions[data.type] = item;
      }else{
        //清除选中
        multOptions[data.type] = null;
      }
    }
    
    // 计算选中的条件有多少个
    let val = [];
    Object.values(multOptions).forEach(item=>{
      if(item instanceof Array){
        val = [...val, ...item];
      }else{
        val = [...val, item];
      }
    });
    this.setState({multOptions, slectNum: val.length});
  }

  // 清除筛选条件
  clearMultAction = ()=>{
    Object.values(this.state.multOptions).forEach(item=>{
      if(item instanceof Array){
        item.forEach(val=>{
          val.selected = false;
        })
      }else{
        item.selected = false;
      }
    });
    this.setState({multOptions: {}, slectNum: 0});
  }
  // 完成选择筛选条件
  finishMultAction = ()=>{
    //将数据传给父组件
    this.props.onSelectFilter(this.state.multOptions, this.state.slectNum);
    //   收起选择面板
    this.setState({
      showMultSort: false,
      showSort2: false
    });
  }



}



/*
function find(...rest){
  let obj = {};
  rest.forEach(arr=>{
    arr.forEach(item=>{
      if(obj[item] == undefined ){
        obj[item] = true;
      }else{
        obj[item] = false;
      }
    })
  })
  console.log(obj);
  
}
*/