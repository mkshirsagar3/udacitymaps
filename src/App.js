import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';

import InfoView from './InfoView';
import ListView from './ListView';
import MapChoices from './MapChoices';
import POIView from './POIView';
import Search from './Search';
import SearchResults from './SearchResults';
import {MapsContext,MapView} from './MapView';


/* We maintain the model information in APP
 -* Emith the info via props
 -* receive updates via api calls from components
 =* has api as prop
 =*/
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
            
               Neighborhood Maps
            
                </header>
                <div className='content-pane'>
            <div className='search-view' >
                    <Search api={this.api} />
            </div>
            <div className='map-view'>
            <MapView  animate={this.state.animate} searchList={this.state.showSearch?this.state.searchList:null} api={this.api} poiList={this.state.poiList} mapCenter={this.state.currentLocation} mapid='map'/>
            </div>
            <div className='info-view'>
            <InfoView className='info-view-grid'  info={this.state.info} api={this.api}  />
            </div>
            <div className='list-view'>
            <ListView   selected={this.state.selected} api={this.api} searchList={this.state.showSearch?this.state.searchList:null}  poi={this.state.poi} poiList={this.state.poiList}/>
            </div>
            
            <div className='status-view'>
            
                    <div >                </div>
            </div>
                </div>
            </div>
            </MapsContext.Provider>
    );
  }
}

export default App;
