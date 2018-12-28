import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import { PlacesOfInterest, HoursOfOperation } from "./PlacesOfInterest.js";
const MapsContext = React.createContext({});
class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        map: null,
        markers: [],
        poiListMarkers: [],
        mapCenter: null
        };
    }
    showInfo(a) {
        this.props.api.showInfo(a);
    }
    setupPlace(search, place) {
        let a = place;
        let icon_prefix = "/img/markers/blue_Marker";
        if (search) {
            icon_prefix = "/img/markers/green_Marker";
        }
        let loc = new window.google.maps.LatLng(a.location.lat, a.location.lng);
        console.log(loc);
        let firstLetter = new String(a.name[0]);
        let thisView = this;
        var infowindow = new window.google.maps.InfoWindow();
        let mark = new window.google.maps.Marker({
                                                 position: loc,
                                                 map: thisView.map,
                                                 title: a.name,
                                                 
                                                 icon: icon_prefix + firstLetter.toUpperCase() + ".png"
                                                 });
        window.google.maps.event.addListener(mark, "click", function() {
                                             thisView.props.api.selectPlace(a);
                                             infowindow.setContent(
                                                                   `<div><strong>${a.name} </strong>
                                                                   <br>
                                                                   <span >${
                                                                   a.location
                                                                   .formattedAddress
                                                                   }</span></br></div>`
                                                                   );
                                             infowindow.open(thisView.map, this);
                                             });
        
        if (this.props.animate && this.props.animate.id == a.id) {
            mark.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function() {
                       mark.setAnimation(null);
                       }, 2000);
        }
        return mark;
    }
    drawMap(props) {
        if (!window.google) return;
        let elem = document.getElementById(props.mapid);
        if (!elem) return;
        elem.innerHtml = "";
        if (!props.mapCenter) {
            return;
        }
        
        let loc = this.props.mapCenter.location;
        
        let mapCenterObj = new window.google.maps.LatLng(loc.lat, loc.lng);
        if (!this.map) {
            this.map = new window.google.maps.Map(elem, {
                                                  center: mapCenterObj,
                                                  zoom: 8
                                                  });
        } else {
            this.map.setCenter(mapCenterObj);
        }
        if (this.state.markers) {
            this.state.markers.forEach(a => {
                                       a.setMap(null);
                                       });
        }
        var marker = new window.google.maps.Marker({
                                                   position: mapCenterObj,
                                                   map: this.map,
                                                   title: props.mapCenter.title
                                                   });
        let newList = [marker];
        if (props && props.searchList != null) {
            let thisView = this;
            
            console.log("loc list", props.searchList);
            
            for (let i = 0; i < props.searchList.length; i++) {
                let a = props.searchList[i];
                console.log("lox", a, a.location);
                if (a) {
                    let mark = this.setupPlace(true, a);
                    
                    newList.push(mark);
                }
            }
            
            // this.setState({markers:newList});
        } else if (props && props.poiList) {
            // remove existing
            //this.state.poiListMarkers.forEach (a=> a.remove());
            // Add new
            let thisView = this;
            
            console.log("loc list", props.poiList);
            
            for (let i = 0; i < props.poiList.length; i++) {
                let a = props.poiList[i];
                console.log("lox", a, a.location);
                if (a) {
                    let mark = this.setupPlace(false, a);
                    
                    newList.push(mark);
                }
            }
            
            // this.setState({markers:newList});
        }
        // Refresh Map
        window.google.maps.event.trigger(this.map, "bounds_changed");
        this.setState({ markers: newList });
        this.setState({
                      map: this.map,
                      markers: newList,
                      version: 0,
                      mapCenter: props.mapCenter
                      });
    }
    componentDidMount() {
        this.drawMap(this.props);
        
        //this.markers.push(marker);
    }
    
    componentWillReceiveProps(props) {
        this.drawMap(props);
    }
    
    static contextType = MapsContext;
    render() {
        return (
                <div
                className={this.props.className + " map-view"}
                id={this.props.mapid}
                />
                );
    }
}
export { MapsContext, MapView };
