
/* Find places of interest using four Square API
- * Input, location
- * returns a promise
*/

const uri='https://api.foursquare.com/v2/venues/search?client_secret=V4U5BV1WHHWIYDWXET44VCBDLPUSDKWJHMP4MQM0LGQMJZZ2&client_id=BI2HLTCLHB2PNL4EUDHWGM354J1CB0UTSPOIVWJXD1NFW4BI&v=20181227';
const houruri='https://api.foursquare.com/v2/venues/';


const authtrail='client_secret=V4U5BV1WHHWIYDWXET44VCBDLPUSDKWJHMP4MQM0LGQMJZZ2&client_id=BI2HLTCLHB2PNL4EUDHWGM354J1CB0UTSPOIVWJXD1NFW4BI&v=20181227';

 function PlacesOfInterest (location)
{
    let url=`${uri}&ll=${location.lat},${location.lng}`;
console.log(url);
    return (fetch(url)
    .then(function(response) {
    return response.json();
    })
    );
}


 function HoursOfOoperation (location)
{
let url=`${houruri}/${location.id}` +authtrail;
console.log(url);
return (fetch(url)
.then(function(response) {
return response.json();
})
);
}

export { PlacesOfInterest ,HoursOfOoperation};
