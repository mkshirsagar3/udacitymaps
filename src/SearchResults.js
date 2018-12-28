import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';
/*---
 -* show Search Results
 -*/
export default class SearchResults extends Component
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
