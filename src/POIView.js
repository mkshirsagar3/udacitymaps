import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';

/*---
 -* show POints of interests
 -*/

export default class POIView extends Component
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
