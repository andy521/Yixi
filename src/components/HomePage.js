import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import Loading from 'react-loading';
require('../stylesheet/Home.scss');
require('../stylesheet/swiper.scss');
export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        albumList : {}
    }
    this.setState = this.setState.bind(this);
    this.fetchHome = this.fetchHome.bind(this);
  }
  fetchHome(){
    const api_url = "/api/v1/album";
    fetch(api_url).then((response) => response.json()).then((data) =>
      this.setState({
        albumList:data
      })
    );
  }
  componentWillMount(){
    this.fetchHome();
  }
  render(){
    //let albumList = this.renderList();
    const params = {
      direction: "horizontal"
    }
    if(this.state.albumList.data){
      var AlbumList = Array.prototype.map.call(this.state.albumList.data, function(item, k){
        return <AlbumItem album={item} key={item.id} />
      })
      return <Swiper {...params}>{AlbumList}</Swiper>
    } else{
      return <Loading className='state-loading' type={'cubes'} color={'#cc3434'} height='50' width='50' />
    }
  }
}
class AlbumItem extends Component {
  constructor(props){
    super(props);
    this.renderList = this.renderList.bind(this);
    this.HTMLDecode = this.HTMLDecode.bind(this);
  }
  HTMLDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  renderList(){
    //console.log(this.props.album.lectures[0]);
    let bg = this.props.album ? this.props.album.background.replace(".1536x1000","") : "";
    return (<div className="lecture-item" style={{backgroundImage: `url('${bg}')`}}>
      <div className="item-intro">
        <h2 className="item-title">{this.props.album ? this.props.album.title : ""}</h2>
        <p className="item-desc">{this.props.album ? this.HTMLDecode(this.props.album.desc) : ""}</p>
      </div>
      <div className="item-content">
          <div className="item-pure" dangerouslySetInnerHTML={{__html: this.props.album ? this.props.album.webcontent : ""}}></div>
      </div>
    </div>);
  }
  render() {
    return ( <div className="swiper-slide ">{this.renderList()}</div>);
  }
}
