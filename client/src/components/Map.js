import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import Form from './Form';
import { deleteLogEntry, listLogEntries } from '../API';

const Map = () => {
    const [addPinLocation, setAddPinLocation] = useState(null);
    const [logEntries, setLogEntries] = useState([]);
    const [showPopup, setShowPopup] = useState({});
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 43.6426,
        longitude: -79.3871,
        zoom: 3
    });

    const AddPin = (event) => {
        const [longitude, latitude] = event.lngLat;
        setAddPinLocation({
            latitude,
            longitude,
        });
    };

    const getEntries = async () => {
        const logEntries = await listLogEntries();
        setLogEntries(logEntries);
    };

    useEffect(() => {
        getEntries();
    }, []);

    const deleteEntry = async (id) => {
        try {
            const deleted = await deleteLogEntry(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoic2hlaGFuYmFuZGFyYSIsImEiOiJja3h3bjZzaGYyMWhnMzBueW5pazE5cTI0In0.YqWizZJ27g96KEsxOUA3iA'
            mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
            onViewportChange={setViewport}
            onDblClick={AddPin} >
            {
                logEntries.map(entry => (
                    <React.Fragment key={entry._id}>
                        <Marker
                            key={entry._id}
                            latitude={entry.latitude}
                            longitude={entry.longitude} >
                            <div
                                onClick={() => setShowPopup({
                                    [entry._id]: true
                                })} >
                                <svg
                                    className="pin blue"
                                    style={{
                                        height: `${6 * viewport.zoom}px`,
                                        width: `${6 * viewport.zoom}px`,
                                    }}
                                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                    <g>
                                        <g>
                                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Marker>
                        {
                            showPopup[entry._id] ? (
                                <Popup
                                    latitude={entry.latitude}
                                    longitude={entry.longitude}
                                    closeButton={false}
                                    closeOnClick={true}
                                    dynamicPosition={true}
                                    onClose={() => setShowPopup({})}
                                    anchor="top" >
                                    <div className="popup">
                                        <h3>📍 {entry.title}</h3>
                                        <p>💭 {entry.comments}</p>
                                        <small>📅 Visited On: {new Date(entry.visitDate).toLocaleDateString()}</small>
                                        {entry.image && <img src={entry.image} alt={entry.title} />}
                                        <button
                                            className='delete-button'
                                            onClick={() => {
                                                deleteEntry(entry._id);
                                                getEntries();
                                            }}>❌ Delete Travel Log Entry ❌</button>
                                    </div>
                                </Popup>
                            ) : null
                        }
                    </React.Fragment>
                ))
            }
            {
                addPinLocation ? (
                    <>
                        <Marker
                            latitude={addPinLocation.latitude}
                            longitude={addPinLocation.longitude} >
                            <div>
                                <svg
                                    className="pin red"
                                    style={{
                                        height: `${6 * viewport.zoom}px`,
                                        width: `${6 * viewport.zoom}px`,
                                    }}
                                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                    <g>
                                        <g>
                                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Marker>
                        <Popup
                            latitude={addPinLocation.latitude}
                            longitude={addPinLocation.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            dynamicPosition={true}
                            onClose={() => setAddPinLocation(null)}
                            anchor="top" >
                            <div className="popup">
                                <Form
                                    location={addPinLocation}
                                    onClose={() => {
                                        setAddPinLocation(null);
                                        getEntries();
                                    }} />
                            </div>
                        </Popup>
                    </>
                ) : null
            }
        </ReactMapGL>
    );
}

export default Map;