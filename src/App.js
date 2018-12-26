import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';

const MapsContext= React.createContext({});
class Search extends Component
{
    render () {return <div></div>};
}

class MapView extends Component
{
    
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
        this.map = new window.google.maps.Map(elem, {
                                               center: props.mapCenter.location,
                                               zoom: 8
                                               });
        
        
        
        var marker = new window.google.maps.Marker({
                                                   position: props.mapCenter.location,
                                                   map: this.map,
                                                   title: props.mapCenter.title
                                                   });
        this.setState({map:this.map,markers:[marker],version:0,mapCenter:props.mapCenter});
        
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
    

class MapContainer extends Component
{
    render () {return (<MapView className={this.props.className} mapid='map' api={this.props.api} style={{width:'100%', height:'100%'}} mapCenter={this.props.mapCenter} ></MapView>)};
}
class ListContainer extends Component
{
    render () { return (<ListView className={this.props.className} api={this.props.api} style={{width:'100%', height:'100%'}} />)};
}
class ListView extends Component
{
    render () { return (<div className={this.props.className} api={this.props.api} className='listview-split'><MapChoices api={this.props.api}></MapChoices><SearchResults/></div>) };
}
class MapChoices extends Component
{
    
    setMapCenter(newLoc)
    {
        this.props.api.setLocation(newLoc);
    }
    static contextType = MapsContext;
    
    render () {return (<ul style={{width:'100%'}}>
             <li>
             <Select onChange={this.setMapCenter.bind(this)} options={this.context.locationOptions} />
             </li>
             </ul>
             )}
    
}
class SearchResults extends Component
{
    render () {return (<ul className={this.props.className} style={{width:'100%'}}>
             <li>
             </li>
             </ul>
             )}
}
class InfoContainer extends Component
{
    render ()
    {
        return <InfoView className={this.props.className} api={this.props.api} />;
    }
}
class InfoView extends Component
{
    render() {  return (<div className={this.props.className} >Info</div>)};
    
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
                     
                     {label:"New York",value:"NewYork",location:{lat:40.7128,lng:74.0060}},
                     {label:"Boston",value:"Boston",location:{lat:42.3601, lng:71.0589}}
                     ],
        
    currentLocation:''
    };
        this.mapDataObj.currentLocation=this.mapDataObj.locationOptions[0];
        this.state={...this.mapDataObj};
        this.api={};
        this.api.setLocation=this.setLocation.bind(this);
    
        
    }
    setLocation (loc)
    {
        this.setState({currentLocation:loc})
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
                    <MapContainer   api={this.api} mapCenter={this.state.currentLocation} />
            </div>
            <div className='list-view'>
                    <ListContainer   api={this.api}  />
            </div>
            <div className='info-view'>
                    <InfoContainer  api={this.api}  />
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
