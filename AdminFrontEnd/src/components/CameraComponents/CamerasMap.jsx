import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './InstalledCameras.module.css'; // You may need to adjust the path to your CSS file

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJzdGFuZ2VudCIsImEiOiJjbG9ramRjMm8yMXI4MmluMDR5MXBuMzJ0In0.RDs0ovR6g_DaAlsTMeZ_nQ';

export default function CamerasMap({ cameras, setSelectedCamera }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    console.log(cameras);
    console.log('here');
    console.log(map.current);
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [75, 35], // Default center
        zoom: 4, // Default zoom
      });
    }

    map.current.on('load', () => {
      // Add markers for cameras
      cameras.forEach((camera) => {
        const { lat, lon, uniqueId, status } = camera;
      
        // Create a custom marker element
        const markerElement = document.createElement('div');
        markerElement.style='width: 30px;height: 30px;cursor: pointer;'
        markerElement.className = 'custom-marker';
      
        // Create a colored circle inside the marker
        const circleElement = document.createElement('div');
        circleElement.style = 'position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%);width: 100%;height: 100%;border-radius: 50%;'
        circleElement.style.backgroundColor = status == "danger"? '#007BFF' :'#007BFF'; // Default color is blue
        markerElement.appendChild(circleElement);
      
        // Create an image element inside the marker
        const imageElement = document.createElement('img');
        imageElement.style = 'position: relative;z-index: 1;width: 100%;height: 100%;border-radius: 50%;'
        imageElement.src = "https://static.vecteezy.com/system/resources/previews/018/931/360/original/black-camera-icon-png.png"; // Set the image source
        imageElement.alt = uniqueId; // Set the alt text for accessibility
        markerElement.appendChild(imageElement);
      
        // Create a mapboxgl.Marker with the custom marker element
        new mapboxgl.Marker(markerElement)
          .setLngLat([lon, lat])
          .addTo(map.current);
          
        markerElement.addEventListener('click', () => {
          setSelectedCamera(camera);
          // Optionally, you can perform other actions here
        });
      });
    });

  }, [cameras]);

  return <div ref={mapContainer} style={{ height: '400px' }} />;
}