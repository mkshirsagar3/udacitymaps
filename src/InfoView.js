import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import {PlacesOfInterest,HoursOfOperation} from './PlacesOfInterest.js';
/*---
 -* show Info tab
 -* Uses FoursSQaure API (venues/places
 -* Shows hours of operations if available
 -*/
export default class InfoView extends Component
{
    constructor (props)
    {
        super(props);
        this.state={hours:null};
    }
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
    componentWillReceiveProps(props)
    {
        if (props.info)
        {
            HoursOfOperation(props.info).then(result =>{
                                              console.log('hours' ,result);
                                      
                                              if (result.response && result.response.popular && result.response.popular.timeframes)
                                              
                                                this.setState({hours:result.response.popular.timeframes});
                                              else
                                               this.setState({hours:[]});
                                              }).catch(e=>console.log('hours',e));
            
        }
    }
    
    componentDidMount()
    {
        let props=this.props;
        if (props.info)
        {
            HoursOfOperation(props.info).then(result =>{
                                              console.log('hours' ,result);
                                              
                                              if (result.response && result.response.popular && result.response.timeframes)
                                              
                                              this.setState({hours:result.response.popular.timeframes});
                                              else
                                              this.setState({hours:[]});
                                              }).catch(e=>console.log('hours',e));
            
        }
        
    }
    constructHours(timeframe)
    {
        let Days=["SUN","MON","TUE","WED","THU","FRI","SAT"];
        function Hours(c)
        {
            return ( "Hours : "+c.start + '-' +c.end );
        }
        if (!timeframe)
        {
            return null;
        }
        return (<ul>
                {
                timeframe.map(a=>{
                              let days=a.days.map(b=>Days[b-1])
                              let daysString=days.join(' ');
                            
                              let hours=a.open.map(c=>Hours(c))
                              let hourString=hours.join(' ');
                              return <li key={days}><span>{days + ' ' +hourString}</span></li>;
                              })
                }
                </ul>
                )
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
                            <div className  className='info-hours' >
                        
                            { this.props.info?
                        
                            <h2 >{this.props.info.name }</h2>:null
                        
                            }
                            {this.props.info? this.constructHours(this.state.hours):null}
                        
                        
                        
                        
                            </div>
                        </div>)};
    
}
