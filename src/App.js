import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';
const MapsContext= React.createContext({});
class Search extends Component
{
    constructor (props)
    {
        super(props);
        this.state={search:null};
    }
    searchChg (e)
    {
        let searchStr=e.target.value;
        this.props.api.setSearch(searchStr);
        this.setState({search:searchStr});
    }
    clearSearch()
    {
        this.props.api.clearSearch();
    }
    render () {return <div style={{width:'100%'}}>
        <label style={{width:'100%'}}> Search Filter <input style={{border:'1px solid grey'}} onChange={this.searchChg.bind(this)} value={this.state.search?this.state.search:''}/></label>
        <button style={{'backgroundColor':'#aaa' }} onClick={this.clearSearch.bind(this)}>Clear Filter </button> </div>};
}

class MapView extends Component
{
    constructor(props)
    {
        super(props);
        this.state={map:null,markers:[],poiListMarkers:[],mapCenter:null};
    }
    showInfo(a)
    {
        this.props.api.showInfo(a);
        
    }
    setupPlace (search,place)
    {
        let a=place;
        let icon_prefix='/img/markers/blue_Marker'
        if (search)
        {
            icon_prefix='/img/markers/green_Marker';
        }
        let loc=new window.google.maps.LatLng(a.location.lat, a.location.lng);
        console.log(loc);
        let firstLetter=new String(a.name[0]);
        let thisView=this;
        var infowindow = new window.google.maps.InfoWindow();
        let mark=new window.google.maps.Marker({
                                               
                                               
                                               position: loc,
                                               map: thisView.map,
                                               title: a.name,
                                               
                                               icon:icon_prefix+firstLetter.toUpperCase()+'.png'
                                               });
        window.google.maps.event.addListener(mark, 'click', function() {
                                             thisView.props.api.selectPlace(a);
                                             infowindow.setContent(
                                                                   `<div><strong>${a.name} </strong>
                                                                   <br>
                                                                   <span >${a.location.formattedAddress}</span></br></div>`);
                                             infowindow.open(thisView.map, this);
                                             });
       
        if (this.props.animate && this.props.animate.id == a.id )
        {
            mark.setAnimation(window.google.maps.Animation.BOUNCE);            setTimeout(function () {mark.setAnimation(null)},2000);
        }
        return(mark);
    }
    drawMap(props)
    {
        if (!window.google) return;
        let elem=document.getElementById(props.mapid);
        if (!elem) return;
        elem.innerHtml='';
        if (!props.mapCenter)
        {
            return;
        }
     
        let loc=this.props.mapCenter.location;
        
         let mapCenterObj = new window.google.maps.LatLng(loc.lat,loc.lng);
        if (!this.map)
        {
            
            this.map = new window.google.maps.Map(elem, {
                                               center: mapCenterObj,
                                               zoom: 8
                                               });
        
        }
        else
        {
            this.map.setCenter(mapCenterObj);
            
        }
        if (this.state.markers)
        {
            this.state.markers.forEach(a=>
                                       {
                                        a.setMap(null);
                                       });
        }
        var marker = new window.google.maps.Marker({
                                                   position: mapCenterObj,
                                                   map: this.map,
                                                   title: props.mapCenter.title
                                                   });
         let newList=[marker];
        if (props && (props.searchList != null))
        {
            let thisView=this;
           
            console.log('loc list',props.searchList);
            
            for ( let i=0; i< props.searchList.length; i++)
            {
                let a=props.searchList[i];
                console.log('lox',a, a.location);
                if (a)
                {
                    let mark= this.setupPlace(true,a)
                    
                    newList.push(mark);
                }
            }
            
           // this.setState({markers:newList});
            
        }
        else if (props && props.poiList)
        {
           // remove existing
            //this.state.poiListMarkers.forEach (a=> a.remove());
           // Add new
            let thisView=this;
         
            console.log('loc list',props.poiList);
            
            for ( let i=0; i< props.poiList.length; i++)
            {
                let a=props.poiList[i];
                console.log('lox',a, a.location);
                if (a)
                {
                   let mark= this.setupPlace(false,a)
              
                newList.push(mark);
                }
            }
           
           // this.setState({markers:newList});
            
        }
         // Refresh Map
        window.google.maps.event.trigger(this.map, 'bounds_changed');        this.setState({markers:newList});
        this.setState({map:this.map,markers:newList,version:0,mapCenter:props.mapCenter});
        
    }
        componentDidMount() {
           this.drawMap(this.props);
            
            //this.markers.push(marker);
        }
    
        componentWillReceiveProps(props)
        {
            
            this.drawMap(props);
            
        }
    
         static contextType = MapsContext;
        render () {
        return (
                <div className={this.props.className} id={this.props.mapid} style={{width:'100%', height:'100%'}}>
                </div>
                );
        }
}

class POIView extends Component
{
    showPoi(event, place)
    {
        console.log(event.target);
        console.log(place);
        if (event.target.checked)
        {
            this.props.api.addPoi(place);
            
        }
        else
        {
            this.props.api.removePoi(place);
        }
    }
    inPoiList (place)
    {
        if (this.props.poiList)
        {
            let filter=this.props.poiList.filter(a=>a.id===place.id);
            if (filter.length > 0)
                return true;
            return false;
        }
    }
    render ()
    {
        if (this.props && this.props.poi)
         return (
       
        <ul className='poi-view' style={{width:'100%'}}>
                 <li style={{'textAlign':'center'}}> <h4>Points of Interest</h4></li>
        {
                 this.props.poi.map(a=>
                                    <li className={ ((this.props.selected && this.props.selected.id == a.id)?'selected-item':'')}
                                    key={a.id} >
                                    <input type="checkbox" checked={this.inPoiList(a) } onChange={e=>this.showPoi(e,a)}/>
                                        <span onClick={()=>this.props.api.animateMarker(a)}>{a.name}
                                        </span>
                                    </li>
                                    )
        }
                 </ul>
             );
        return (<div></div>);
    }
}

class MapContainer extends Component
{
    render () {return (<MapView className={this.props.className} mapid='map' api={this.props.api} style={{width:'100%', height:'100%'}} searchList={this.props.searchList} poiList={this.props.poiList} animate={this.props.animate} mapCenter={this.props.mapCenter} ></MapView>)};
}
class ListContainer extends Component
{
    render () { return (<ListView poi={this.props.poi} searchList={this.props.searchList} className={this.props.className} poiList={this.props.poiList} api={this.props.api} selected={this.props.selected}style={{width:'100%', height:'100%'}} />)};
}
class ListView extends Component
{
    render () {
        if (this.props.searchList)
        
        {
            return (<div  api={this.props.api} className='listview-split'><MapChoices api={this.props.api}></MapChoices><SearchResults  className='search-view'
                    selected={this.props.selected}  api={this.props.api} searchList={this.props.searchList}/></div>)
        }
        else
        {
            return (<div  api={this.props.api} className='listview-split'><MapChoices api={this.props.api}></MapChoices><POIView selected={this.props.selected} className='list-view-poi'
                    api={this.props.api} poiList={this.props.poiList} poi={this.props.poi}/></div>)
        }
        
        };
}
class MapChoices extends Component
{
        static contextType = MapsContext;
    
    
    setMapCenter(newLoc)
    {
        console.log(newLoc);
        this.props.api.setLocation(newLoc);
        //this.setState({location:newLoc});
    }
   
    
    
    render () {
        
        let curLoc=this.context.currentLocation;
        if (!curLoc)
        {
            this.setMapCenter(this.context.locationOptions[0]);
            curLoc=this.context.locationOption[0];
        }
        console.log(curLoc);
        return (<ul style={{width:'100%'}}>
             <li>
                <Select value={curLoc} onChange={this.setMapCenter.bind(this)} options={this.context.locationOptions} />
             </li>
             </ul>
             )}
    
}
class SearchResults extends Component
{
    render () {return (<ul className='poi-view' style={{width:'100%'}}>
             <li> Search</li>
             
                      
                       {
                       this.props.searchList.map(a=><li  className={ ((this.props.selected && this.props.selected.id == a.id)?'selected-item':'')} key={a.id} onClick={e=>this.click(a)}>  {a.name} </li>)
                       }
                       
                       
             </ul>
             )}
    click(place)
    {
        this.props.api.animateMarker(place);
    }
    
}

class InfoView extends Component
{
    categories ()
    {
        if (this.props.info && this.props.info.categories)
        {
            let CastString = this.props.info.categories.map(a=>a.name).join(' ');
            return (
                <div > <h3> Categories </h3>
                <p> { CastString } </p>
                </div>
                    )
        }
        return null;
    }
    render() {  return (<div className={'info-view-grid '+this.props.className} >
                           <div className  className='info-tab' >
                        
                        { this.props.info?
                     
                        <h2 >{this.props.info.name }</h2>:null}
                         { this.props.info?
                        <p> {this.props.info.location.formattedAddress} </p>:null
                         }
                         {
                        this.categories()
                         }
                       
                        
                        </div>
                        </div>)};
    
}
class App extends Component {
    constructor (props)
    {
        super(props);
        
        this.mapDataObj={
    apiKey:'xxx',
    currentMapLocation:'yyy',
    map:'',
    markers:[],
        
    locationOptions:[
                     
                     {label:"New York",value:"NewYork",location:{lat:40.7128,lng:-74.0060}},
                     {label:"Boston",value:"Boston",location:{lat:42.3601, lng:-71.0589}}
                     ],
        
    currentLocation:'',
        poiList:[],
        showSearch:false
    }
        
        this.mapDataObj.currentLocation=this.mapDataObj.locationOptions[0];
        this.state={...this.mapDataObj};
        this.api={};
        this.api.setLocation=this.setLocation.bind(this);
    
        this.api.addPoi=this.addPoi.bind(this);
        this.api.setSearch=this.setSearch.bind(this);
        this.api.clearSearch=this.clearSearch.bind(this);
        this.api.removePoi=this.removePoi.bind(this);
        this.api.showInfo=this.showInfo.bind(this);
        this.api.selectPlace=this.selectPlace.bind(this);
        this.api.animateMarker=this.animateMarker.bind(this);
        
    }
    placesOfInterest(loc)
    {
        let poi=PlacesOfInterest(loc.location);
        poi.then(data=>{
         
                 this.setState({poiList:data.response.venues,poi:data.response.venues});
                 });
       
    }
    animateMarker(place)
    {
        this.setState({animate:place});
        let thisView=this;
        this.showInfo(place)
        setTimeout(function () {thisView.setState({animate:null}) },2000);
    }
    setLocation (loc)
    {
        this.setState({currentLocation:loc})
        this.placesOfInterest(loc);
    }
    setSearch(str)
    {
        let searchResults= this.state.poi && this.state.poi.filter(a=>{
                        let name=a.name;
                        if (a.name.search(new RegExp(str, "i")) !== -1)
                        {
                        return true;
                        }
                        return false;
                                          });
        if (!searchResults)
            searchResults=[];
        this.setState({searchList:searchResults,showSearch:true});
    }
    clearSearch()
    {
        this.setState({searchList:[],showSearch:false})
    }
    removePoi (poi)
    {
         let exists=this.state.poiList.filter(a=>a.id===poi.id);
        let poilist=this.state.poiList.filter(a=>a.id!==poi.id) ;
       
        if (exists.length>0)
        {
            this.setState({poiList:poilist});
        }
    }
    selectPlace(place)
    {
        this.setState({selected:place});
        this.showInfo(place)
        
    }
    addPoi (poi)
    {
        let poilist=this.state.poiList ;
        let exists=poilist.filter(a=>a.id===poi.id);
        if (exists.length==0)
        {
            let newPl=poilist.splice(0);
            newPl.push(poi);
            this.setState({poiList:newPl});
        }
    }
    componentDidMount ()
    {
        if (! (this.state.currentLocation && this.state.poiList.length > 0))
        {
            this.setLocation (this.mapDataObj.locationOptions[0]);
        }
    }
    showInfo (loc)
    {
        this.setState({info:loc});
    }
    render() {
    return (
            <MapsContext.Provider value={this.mapDataObj}>
            <div className="App">
                <header className=" header">
            
                Maps Fun
            
                </header>
                <div className='content-pane'>
            <div className='search-view' >
                    <Search api={this.api} />
            </div>
            <div className='map-view'>
            <MapContainer  animate={this.state.animate} searchList={this.state.showSearch?this.state.searchList:null} api={this.api} poiList={this.state.poiList} mapCenter={this.state.currentLocation} />
            </div>
            <div className='list-view'>
            <ListContainer   selected={this.state.selected} api={this.api} searchList={this.state.showSearch?this.state.searchList:null}  poi={this.state.poi} poiList={this.state.poiList}/>
            </div>
            <div className='info-view'>
            <InfoView className='info-view-grid'  info={this.state.info} api={this.api}  />
            </div>
            <div className='status-view'>
            
                    <div > Status                </div>
            </div>
                </div>
            </div>
            </MapsContext.Provider>
    );
  }
}

export default App;
