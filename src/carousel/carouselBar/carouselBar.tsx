import React, { Component } from 'react';

interface Props {
  nowIndex: number;
  count:number;
  turn:(value: number) => void;
}

export default class SliderBar extends Component<Props> {
  constructor(props:any) {
    super(props);
  }
/**
* 点击页面下放的进度条可定位到对应页面
* @param {Number} i 页面的索引
*/
  handleBarClick = (i:number) => {
    let option = i - this.props.nowIndex;
    this.props.turn(option);
  }

  render() {
    let barNodes = [];
    let { count, nowIndex } = this.props;
    let sWidth = 30*count+10*(count-1) + 'px';
  
    for(let i = 0; i < count-1; i++) {
      barNodes[i] = (
        <div className="slider-bar" key={'pic' + i} onClick={() => this.handleBarClick(i)}>
            <div className={"percent" + (i == nowIndex || i == 0 && nowIndex == count -1 ? " active":"")}></div>
        </div>
      );
    }
    return (
      <div className="slider-dots-wrap" style={{width:sWidth}}>
        {barNodes}
      </div>
    );
  }
}
