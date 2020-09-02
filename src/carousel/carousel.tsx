import React, { Component } from 'react';
import './carousel.css';
import SliderItem from './carouselItem/carouselItem';
import SliderBar from './carouselBar/carouselBar';

interface Props {
  items: any[];
  speed:number;
  delay:number;
  pause:boolean;
  autoplay?: boolean;
  bar:boolean;
}
interface State{
  nowIndex:number,
  speed:number
}

export default class Carousel extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      nowIndex: 0,
      speed:this.props.speed
    };
  }
  private autoPlayFlag:NodeJS.Timer | null = null;

/**
* 翻页定位逻辑
*/
  turn = (n:number) => {
    let { nowIndex } = this.state;
    let _n = n + nowIndex;
    if(nowIndex == 0){
      this.setState({speed:this.props.speed});
    }
    if(_n >= this.props.items.length - 1){
      setTimeout(() => {
        this.setState({nowIndex:0, speed:0});
      }, this.props.speed * 1000);
    }
    this.setState({nowIndex: nowIndex + n});
  }
/**
* 自动播放
*/
  goPlay = () => {
    if(this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
      }, this.props.delay * 1000);
    }
  }
/**
* 暂停播放
*/
  pausePlay = () => {
    clearInterval(Number(this.autoPlayFlag));
  }

  componentDidMount = ()=> {
    this.goPlay();
  }

  render() {
    let count = this.props.items.length;
    let {nowIndex,speed} = this.state;

    let itemNodes = this.props.items.map((item, idx) => {
      return <SliderItem item={item} count={count} key={'item' + idx} idx={idx}/>;
    });

    let barNode = <SliderBar turn={this.turn} count={count} nowIndex={this.state.nowIndex}/>;

    return (
      <div
        className="slider"
        onMouseOver={this.props.pause? this.pausePlay:undefined} onMouseOut={this.props.pause?this.goPlay:undefined}>
          <ul style={{
              left: -100 * nowIndex + "%",
              transitionDuration: speed + "s",
              width: this.props.items.length * 100 + "%"
            }}>
              {itemNodes}
          </ul>
          {this.props.bar ? barNode : null}
        </div>
      );
  }
}
