

## Neighbourhood Map

## Install and run
In the project directory, you can run:

### `npm install`

In the project directory, you can run:

### `npm start`

## User Guide

-Select Neighbourhood
- Select Point of Interest.
- See information on map and info pannel
- Toggle marker using check box
-Add filter terms
- See filter results. On clickiing you will see results on map and infor pannel

- Clicking on a entry in the list, wil bounce the marker if displayed
-Clicking on marker will show popup info and select the entry in the list. It will also update info pannel.


## Design

## Portrait Layout
-List view on left  Pane
-Map on right pane - top
-Info view right pane bottom- scrollable
-search bar on top


## Model
Model will  be maintained in a APP
The model is updated using api object provided as prop to underlying components

## Files in src

├── App.css         App CSS
├── App.js          App js
├── App.test.js
├── InfoView.js     Shows Info pannel
├── ListView.js     Show list of places
├── MapChoices.js   Shows selection for neighbourhood
├── MapView.js      Shows Map
├── POIView.js      ListView component to show Points of Interest
├── PlacesOfInterest.js     FourSqaure API hook to get placesofinterest
├── Search.js       Search Bar Component
├── SearchResults.js    SearchResults component
├── index.css
├── index.js
├── logo.svg
└── serviceWorker.js

##Resource Files

## Resource Files
/public/img/markers contains all marker icon files

## Attribution

-react-select Jed Watson https://github.com/JedWatson/react-select
-Icons for map markers , Benjamin Keen http://www.benjaminkeen.com/google-maps-coloured-markers/
- FourSquare API
https://foursquare.com/developers/explore#req=users%2Fself. This is used as places API. Queries HOURS.
-Google Maps API
-React Framework

## using Context
React context was used as learning experience and is used by two sub components. This can be takem out after using props.

## Quota
The request to foursquare may fail when quoate exceeds. When that happens you wont be able to see hour and may be places too.

## Caching
Service Worker is used for caching provided by react platform



