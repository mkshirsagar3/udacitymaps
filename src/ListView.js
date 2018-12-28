import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';



import MapChoices from './MapChoices';
import POIView from './POIView';

import SearchResults from './SearchResults';
/*---
 -* Container for lists
 -*/
export default class ListView extends Component
{
    render () {
        if (this.props.searchList)
        
        {
            // if showing search results
            return (<div style={{width:'100%', height:'100%'}} api={this.props.api} className='listview-split'><MapChoices api={this.props.api}></MapChoices><SearchResults  className='search-view'
                    selected={this.props.selected}  api={this.props.api} searchList={this.props.searchList}/></div>)
        }
        else
            // or Points of Interests
        {
            return (<div  style={{width:'100%', height:'100%'}} api={this.props.api} className='listview-split'><MapChoices api={this.props.api}></MapChoices><POIView selected={this.props.selected} className='list-view-poi'
                    api={this.props.api} poiList={this.props.poiList} poi={this.props.poi}/></div>)
        }
        
        };
}
