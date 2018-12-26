
const initState={
listViewOptions:
    {
    locations:
    locationOptions:[
                     
                     {label:"New York",value:"NewYork",location:{lat:40.7128,long:74.0060}},
                     {label:"Boston",value:"Boston",location:{lat:42.3601, long:71.0589}}
                     ];
    curLoc:locs[0]
    }
map: {
currentLocation:listViewOptions.curLoc,
map:null,
markers:[],
places:[],
layers:[],

    
}
}

export default function reducer(state = initState, action) {
    // switch between the action type
    switch (action.type) {
        case 'LOCATION_CHANGED':
            const {location} = action.payload;
            let newstate={...state};
            newState.listViewOptions.curLoc=location;
            newState.map.currentLocation=location;
            
            return
               newState
            ;
        default:
            return state;
    }
}
