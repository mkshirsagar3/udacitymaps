import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';
/*---
 -* handle searcgh bar
 -*/
export default class Search extends Component
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
