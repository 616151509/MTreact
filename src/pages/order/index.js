import React, { Component } from "react";
import './style.scss'
import list from './data.json'
// console.log(data.data.categoryList);
export default class Order extends Component {
  constructor(props) {
    super(props);

    // 处理数据
    let navList = [];
    let menuList = [];
    let data = list.data.categoryList;

    data.forEach(({tag,categoryName: name,spuList})=>{
      navList.push({name, tag});
      menuList.push({spuList, tag, name});
    })

    // 赋值
    this.state = {
      // 左边栏数据
      navList,
      // 右边栏数据
      menuList,
      selectIndex: 0
    }
  }
  

  render() {
    let {navList, menuList, selectIndex} = this.state;
    return (
      <div id="order" className="page">
        <div className="nav" ref="nav">
          <div className="nav-wrap">
          {
            navList.map((item, index)=>(
              <li key={item.tag} className={`nav-item ${(selectIndex===index)&&'active'}`} onClick={()=>this.goMenuByIndex(index)}>
                {item.name}
              </li>
            ))
          }
          </div>
        </div>
        <div className="menu" ref="menu">
          <div className="menu-wrap">
          {
            menuList.map((list, i)=>(
              <div key={list.tag} ref={`listTitle${i}`}>
                <h4 className="menu-list-title">{list.name}</h4>
                <ul className="menu-list">
                {
                  list.spuList.map(item=>(
                    <li key={item.spuId} className="menu-item">
                      <div className="item-img" style={{backgroundImage: `url(${item.littleImageUrl})`}}>
                      </div>
                      <div className="item-content">
                        <h4>{item.spuName}</h4>
                        <p>{item.spuDesc}</p>
                        <p><span>月售{item.saleVolume}</span><span>赞{item.praiseNum}</span></p>
                        <p>
                          <span>￥{item.currentPrice}</span>起
                          {
                            item.skuList.length>0
                            ?<button>选规格</button>
                            :<button>+</button>
                          }
                        </p>
                      </div>
                    </li>
                  ))
                }
                </ul>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let navScroll = this.navScroll = new window.IScroll(this.refs.nav, {});
    let menuScroll = this.menuScroll = new window.IScroll(this.refs.menu, {
      probeType: 3
    });
    navScroll.on('beforeScrollStart', ()=>{
      navScroll.refresh();
    })
    menuScroll.on('beforeScrollStart', ()=>{
      menuScroll.refresh();
    });

    // 监听滚动事件，计算选中下标
    menuScroll.on('scroll', ()=>{
      if(this.tapTrigger){
        return;
      }
      //获得所有的menu的dom
      let doms = [];
      for(let i = 0; i < this.state.menuList.length; i++){
        doms.push(this.refs[`listTitle${i}`]);
      }
      // 获得滚动的位置
      let y = this.menuScroll.y;
      // 遍历dom
      for(let index = 0; index < doms.length; index++){
        let max = doms[index].offsetTop * -1;

        if(index < doms.length-1){
          let min =  doms[index+1].offsetTop * -1;
          if(y > min && y <= max){
            this.setState({selectIndex: index});
            break;
          }
        }else{
          this.setState({selectIndex: index});
        }
      }

    })

    menuScroll.on('scrollEnd', ()=>{
      this.tapTrigger = false;
    })

  }


  // 点击左边栏跳转到对应右边的菜单
  goMenuByIndex = (index)=>{
    this.tapTrigger = true;
    // 切换样式
    this.setState({selectIndex: index});

    //获得所有的menu的dom
    let doms = [];
    for(let i = 0; i < this.state.menuList.length; i++){
      doms.push(this.refs[`listTitle${i}`]);
    }
    // 获得需要的滚动的偏移量
    let top = doms[index].offsetTop * -1;

    // 判断偏移量是否还在滚动范围内
    if(this.menuScroll.maxScrollY <= top){
      // 如果在就滚动
      this.menuScroll.scrollTo(0, top, 200);
    }else{
      this.menuScroll.scrollTo(0, this.menuScroll.maxScrollY, 200);
    }

    

    /*
    0------- -1098~0
    1------- -1547~-1098
    2------- -1875~-1547
    ...
    16-----   -14970 ~ -14829
    17------           -14970
    */

    // 0
    // index.js:118 1098
    // index.js:118 1547
    // index.js:118 1875
    // index.js:118 2093
    // index.js:118 2850
    // index.js:118 4366
    // index.js:118 5266
    // index.js:118 8014
    // index.js:118 9035
    // index.js:118 9726
    // index.js:118 11187
    // index.js:118 11592
    // index.js:118 12602
    // index.js:118 13854
    // index.js:118 14094
    // index.js:118 14829
    // index.js:118 14970


    
  }
}
