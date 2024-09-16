import React, {useEffect, useState,useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken= 'pk.eyJ1IjoiY2hhbmRhbmFtYW5pIiwiYSI6ImNtMTIwOGJmazA5YXEyam9panRlZG9vanUifQ.uVqj5ecRNzdnB048zpD6wg';

export default function MapComponent({location, country}) {
    const mapContainer= useRef(null);
    const [coordinates,setcoordinates] = useState([77.209,28.6139]);
    useEffect(()=>{
        const fetchCoordinates= async() => {
            try {
                console.log("coordinates fetch");
                const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(`${location}, ${country}`)}.json?access_token=${mapboxgl.accessToken}`);
                const [lng,lat]= response.data.features[0].center;
                setcoordinates([lng,lat]);
            }
            catch(err) {
                console.log("err is", err)
            }
        };
        if(location && country) {
            fetchCoordinates();
        }
    },[location, country]);
    useEffect(()=> {
        const map= new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 10,
        });
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
        return ()=> map.remove();
    },[coordinates]);
    return (
        <div>
            <div ref={mapContainer} style={{width: '100%', height: '400px'}}/>
        </div>
    )
}