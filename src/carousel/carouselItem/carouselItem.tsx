import React, { Component } from 'react';
import '../carousel.css';
import src from '*.bmp';

interface Img {
  src:string;
  backColor:string;
  title:string;
  subTitle:string
};
interface Props {
  count: number;
  item: Img;
  idx: number;
};
interface State {
  nowIndex:number
};
 
export default class SliderItem extends Component<Props,State> {
  constructor(props:any) {
    super(props);
  }

  render() {
    let { count, item, idx } = this.props;
    let width = 100 / count + '%';
    return (
      <li className="slider-item" style={{width: width, backgroundColor:item.backColor}}>
        <div className="word" style={{color:item.backColor == "#111111"?'#FFFFFF':'#000000'}}>
          <p className="title">{item.title}</p>
          <p className="sub-title">{item.subTitle}</p>
        </div>
        <img className={`img${idx}`} src={item.src}></img>
      </li>
    );
  }
}
