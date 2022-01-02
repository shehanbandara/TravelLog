import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 43.6426,
        longitude: -79.3871,
        zoom: 3
    });
    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoic2hlaGFuYmFuZGFyYSIsImEiOiJja3h3bjZzaGYyMWhnMzBueW5pazE5cTI0In0.YqWizZJ27g96KEsxOUA3iA'
            mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
            onViewportChange={setViewport}
        />
    );
}

export default Map;