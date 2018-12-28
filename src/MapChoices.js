import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';
import {MapsContext} from './MapView';
 export default class MapChoices extends Component
{
        static contextType = MapsContext;
    
    /* Callback on selecting neighborhood */
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

