
/* Find places of interest using four Square API
- * Input, location
- * returns a promise
*/

const uri='https://api.foursquare.com/v2/venues/search?client_secret=V4U5BV1WHHWIYDWXET44VCBDLPUSDKWJHMP4MQM0LGQMJZZ2&client_id=BI2HLTCLHB2PNL4EUDHWGM354J1CB0UTSPOIVWJXD1NFW4BI&v=20181227';
const houruri='https://api.foursquare.com/v2/venues/';


const authtrail='?client_secret=V4U5BV1WHHWIYDWXET44VCBDLPUSDKWJHMP4MQM0LGQMJZZ2&client_id=BI2HLTCLHB2PNL4EUDHWGM354J1CB0UTSPOIVWJXD1NFW4BI&v=20181227';

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
// canned response for testing- reduce API calls

const cannResp={"meta":{"code":200,"requestId":"5c2665fc351e3d5f4fa63de4"},"response":{"hours":{"timeframes":[{"days":[1,2,3,4,5,6,7],"includesToday":true,"open":[{"start":"0600","end":"+0100"}],"segments":[]}]},"popular":{"timeframes":[{"days":[5],"includesToday":true,"open":[{"start":"0700","end":"2000"}],"segments":[]},{"days":[6],"open":[{"start":"1000","end":"1900"}],"segments":[]},{"days":[7],"open":[{"start":"1100","end":"1800"}],"segments":[]},{"days":[1,2,3,4],"open":[{"start":"0700","end":"1900"}],"segments":[]}]}}};

 function HoursOfOperation (location)
{
let url=`${houruri}/${location.id}/hours` +authtrail;
console.log(url);
return (fetch(url)
.then(function(response) {
//return (cannResp);
return response.json();
})
);
}

export { PlacesOfInterest ,HoursOfOperation};
