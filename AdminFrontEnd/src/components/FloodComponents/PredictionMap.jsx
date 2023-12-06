import React from 'react';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import mapboxgl from 'mapbox-gl';
import { useRef, useState, useEffect } from 'react';
import './FloodPrediction.module.css'
import {useUser} from '../../context/UserContext'
import { getPrediction } from '../../services/floods.services';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJzdGFuZ2VudCIsImEiOiJjbG9ramRjMm8yMXI4MmluMDR5MXBuMzJ0In0.RDs0ovR6g_DaAlsTMeZ_nQ';

function fetchJSON(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    });
}
export function PredictionMap() {
  const [userContext, setUserContext] = useUser();
  const [districts, setDistricts] = useState(["Badin"]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  var tooltip;
  const [lng, setLng] = useState(69.3451);
  const [lat, setLat] = useState(30.3753);
  const [zoom, setZoom] = useState(4);
  
  useEffect(() => {
      if (map.current) return; // initialize map only once

      map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
      });
      fetchJSON('PakistanPolygon.geojson')
          .then((data)=>{
              let pakistanFeature = data.features[0];
              map.current.on('load', () => {
                  map.current.addSource("pakistan", {
                      'type': 'geojson',
                      'data': {
                      'type': 'Feature',
                      'geometry': pakistanFeature.geometry
                      }
                  });
                  
                  map.current.addLayer({
                      'id': "pakistan",
                      'type': 'fill',
                      'source': "pakistan", // reference the data source
                      'layout': {},
                      'paint': {
                      'fill-color': '#ff0000', // blue color fill
                      'fill-opacity': 0.0
                  }
                  });

                  map.current.on('mouseleave', "pakistan", function () {
                      map.current.getCanvas().style.cursor = '';
                      if(tooltip)
                      {
                          tooltip.remove();
                      }
                          
                  });

              });
          })
      
      getPrediction(userContext.token).then((response)=>response.data.data.districts).then(
        (districts)=>{
          fetchJSON('DistrictsFloodingStatus.geojson')
          .then(function(data) { 
          let features = data.features;
          features.forEach(feature => {
            feature.properties.flood = districts.includes(feature.properties['City Name']);
          });
          
          map.current.on('load', () => {
              features.forEach((feature)=>{
                  map.current.addSource(feature.properties['City Name'], {
                      'type': 'geojson',
                      'data': {
                      'type': 'Feature',
                      'geometry': feature.geometry
                      }
                      });
                  let fillColor;
                  if(feature.properties['flood']){
                      fillColor = '#FF0000';
                  }
                  else{
                      fillColor = '#6FFF00';
                  }
                  map.current.addLayer({
                      'id': feature.properties['City Name'],
                      'type': 'fill',
                      'source': feature.properties['City Name'], // reference the data source
                      'layout': {},
                      'paint': {
                      'fill-color': fillColor, // blue color fill
                      'fill-opacity': 0.8,
                  }
                  });
                  map.current.addLayer({
                      'id': feature.properties['City Name'] + "-Outline",
                      'type': 'line',
                      'source': feature.properties['City Name'], // reference the data source
                      'layout': {},
                      'paint': {
                      'line-color': '#000', // outline color (black in this example)
                      'line-width': 1 // outline width (adjust as needed)
                  }
                  });
                  map.current.on('mouseenter', feature.properties['City Name'], function (e) {
                      // Create a tooltip element
                      if(tooltip)
                      {
                          tooltip.remove();
                      }
                      map.current.getCanvas().style.cursor = "pointer"
                      tooltip = new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`
                        <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>OpenStreetMap Popup</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        margin: 0;
                                        padding: 0;
                                    }

                                    .popup {
                                        max-width: 300px;
                                    }

                                    .popup img {
                                        width: 100%;
                                        height: auto;
                                        margin-top: 8px;
                                    }
                                </style>
                            </head>
                            <body>

                            <div class="popup">
                                <h2 id="cityName">${feature.properties['City Name']}</h2>
                                <p id="provinceName">Province Name: ${feature.properties['Province']}</p>
                                <p id="floodingStatus">Prediction For Flood: ${feature.properties['flood']?"Yes":"No"}</p>
                            </div>

                            </body>
                            </html>`) // Customize the tooltip content
                        .addTo(map.current);

                  });

                  // map.current.on('mouseleave',feature.id, function () {
                  //     map.current.getCanvas().style.cursor = '';
                  //     if(tooltip)
                  //     {
                  //         tooltip.remove();
                  //     }
                          
                  // });
                  
                  
              })
          });

      },[]);
        }
      )
      map.current.on('mousemove', function (e) {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
          if (tooltip) {
            // Update the tooltip's position to follow the cursor
            tooltip.setLngLat(e.lngLat);
          }
      });

      
   }, []);
    return (
    <>
        {/* Page title */}
        <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Prediction
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid item xs={12} md={12} lg={12} xl={4}>
              <div ref={mapContainer} style={{height: 400}}/>
            </Grid>
        </Grid>

        </Card>
    </>
    );
}
