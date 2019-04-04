import React, { Component } from "react";
import "./home.scss";
import Selector from "../../components/Selector";
import SelectorPanel from "../../components/Selector/selector-panel";
import SellerList from "../../components/SellerList";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelector: false,
      selectSort: null,
      selectFilter: null,
      selectFilterNum: 0
    };
    //请求商家的参数
    this.sellerOption = {};
  }

  getHeader = () => {
    return (
      <header className="header">
        <div className="address">{"庆丰楼庆丰楼庆丰楼庆丰楼庆丰楼庆丰楼"}</div>
        <div className="search">请输入商家或商品名字</div>
      </header>
    );
  };
  getCateList() {
    return (
      <ul className="cate-list">
        {this.props.cateList.map(item => {
          return (
            <li key={item.cateId} className="cate-item">
              <img src={item.icon} alt="" />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    );
  }
  getDOM = () => {
    let selectProps = {
      sort: this.props.sort,
      multifilter: this.props.multifilter,
      filterPrices: this.props.filterPrices,
      selectSort: this.state.selectSort,
      num: this.state.selectFilterNum
    };
    return [
      <div key="home" id="home" className="page">
        {/* 头部 */}
        {this.getHeader()}
        {/* 内容 */}
        <div className="content">
          <div className="wrap">
            {/* 分类列表 */}
            {this.getCateList()}

            <p className="seller-list-title">
              <span>附近商家</span>
            </p>

            {/* 筛选商家的组件 */}
            <Selector {...selectProps} ref="selecor" />
            {/* 商家列表组件 */}
            <SellerList data={this.props.sellerList} />
          </div>
        </div>
        <ul />
      </div>,
      this.state.showSelector && (
        <SelectorPanel
          key="cover"
          {...selectProps}
          onSelectSort={this.handleSelectSort}
          onSelectFilter={this.handleSelectFilter}
        />
      )
    ];
  };

  render() {
    return this.getDOM();
  }

  //选择了排序
  handleSelectSort = item => {
    // 重新请求商家列表数据\、
    this.sellerOption = {
      ...this.sellerOption,
      sortId: item.sortId,
      startIndex: 0
    };
    this.props.getSellerListData(this.sellerOption);

    this.setState({ selectSort: item });
  };

  //选择了过滤
  handleSelectFilter = (option, num) => {
    // 设置值
    let selectOptions = { ...this.state.selectOptions };
    selectOptions["filter"] = option;
    this.setState({ selectFilter: option, selectFilterNum: num });
    // 重新请求商家列表数据
    //处理参数
    let multValue = [];
    let sliderSelectMin = "";
    let sliderSelectMax = "";
    Object.entries(option).forEach(([key, value]) => {
      if (value instanceof Array) {
        value.forEach(item => {
          multValue.push(item.filterId);
        });
      } else {
        if (key === "3") {
          multValue.push(value.filterId);
        } else if (key === "0") {
          sliderSelectMin = value.minVal;
          sliderSelectMax = value.maxVal;
        }
      }
    });
    console.log();
    console.log(sliderSelectMin, sliderSelectMax);
    //构建请求参数
    this.sellerOption = {
      ...this.sellerOption,
      multiFilterIds: multValue.join(","),
      sliderSelectMin,
      sliderSelectMax,
      startIndex: 0
    };
    this.props.getSellerListData(this.sellerOption);
  };

  // 请求下一页数据
  loadMoreRequest() {
    this.sellerOption = {
      ...this.sellerOption,
      startIndex: this.sellerOption.startIndex + 1
    };
    this.props.getSellerListData(this.sellerOption);
  }

  componentDidMount() {
    // 初始化请求数据
    //请求分类列表数据
    this.props.getCateData();
    //请求筛选商家的数据
    this.props.getSelectorData();
    // 请求商家列表数据
    this.props.getSellerListData();

    // 创建滚动视图
    let scroll = new window.IScroll("#home .content", {
      probeType: 3
    });

    let selectorHeight = 0;

    scroll.on("beforeScrollStart", () => {
      // 触碰时刷新
      scroll.refresh();
      // 取得显示筛选条件的结构距离顶部的高度
      selectorHeight = this.refs.selecor.getOffsetTop() * -1;
    });
    scroll.on("scroll", () => {
      // 滚动时判断滚动的位置，控制筛选的真实结构是否展示
      // console.log(scroll.y);
      // console.log(selectorHeight);
      // console.log('---------------------');
      if (scroll.y <= selectorHeight) {
        this.setState({ showSelector: true });
      } else {
        this.setState({ showSelector: false });
      }
    });
  }
}
