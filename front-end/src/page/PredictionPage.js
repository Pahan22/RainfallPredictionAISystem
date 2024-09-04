import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/style.css";
import L from 'leaflet';
import Spinner from './../components/Spinner';

// Ensure Leaflet's default icon is set
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom hook to control map zoom
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

function PredictionPage() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [month, setMonth] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [place, setPlace] = useState('');
  const [latLng, setLatLng] = useState({ lat: '', lng: '' });

  useEffect(() => {
    if (place.trim() !== '') {
      const delayDebounceFn = setTimeout(() => {
        getLatLng(place);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [place]);

  const getLatLng = async (placeName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLatLng({ lat, lng: lon });
        setLatitude(lat);
        setLongitude(lon);
      } else {
        console.error('No results found.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const imgStyles = {
    width: '90%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
    objectFit: 'cover'
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/predict_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longitude, latitude, month }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();

      // Update temperature display
      document.querySelector('.rainfall').textContent = data.rainfall;
      document.querySelector('.temperature').textContent = Math.round(data.temperature) + '°C';



      const weatherAnimationDiv = document.querySelector('.weather-animation');
      const imgElement = document.createElement('img');
      imgElement.alt = 'Animated GIF';
      Object.assign(imgElement.style, imgStyles);
      if (data.rainfall > 400) {
        imgElement.src = require(`./../assets/animations/Animation4.gif`);
      } else if (data.rainfall > 300) {
        imgElement.src = require(`./../assets/animations/Animation1.gif`);
      } else if (data.rainfall > 100) {
        imgElement.src = require(`./../assets/animations/Animation2.gif`);
      } else {
        imgElement.src = require(`./../assets/animations/Animation3.gif`);
      }
      weatherAnimationDiv.innerHTML = '';
      weatherAnimationDiv.appendChild(imgElement);

      console.log('Received data:', data.rainfall);
      setPrediction(data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction({ error: 'Failed to fetch prediction' });
    }
  };


  const lat = parseFloat(latitude) || 51.505;
  const lon = parseFloat(longitude) || -0.09;



  return (
    <section className="vh-90">
      <form onSubmit={handleSubmit}>
        <MDBRow className="justify-content-start align-items-start mb-3">
          <MDBCol md="10" lg="6" xl="3">
            <MDBInput
              label="Place"
              id="place"
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              labelStyle={{ color: "#161D6F" }}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </MDBCol>

          <MDBCol md="10" lg="6" xl="3">
            <MDBInput
              label="Month"
              id="month"
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              labelStyle={{ color: "#161D6F" }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="10" lg="6" xl="2">
            <MDBBtn type="submit" color="primary">Submit</MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>

      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="10" lg="6" xl="6">
            <MDBCard className="custom-card text-black" style={{ borderRadius: "40px", height: "300px" }}>
              <div className="card-body text-center p-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol xl={6}>
                    <div className="weather-animation h-100">
                      <img className="image" src={require(`./../assets/animations/Animation-waiting.gif`)} alt="Animated GIF" style={imgStyles} />
                    </div>
                  </MDBCol>
                  <MDBCol xl={6}>
                    <div className="d-flex flex-column text-center">
                      <MDBTypography
                        tag="h6"
                        className="display-4 mb-0 font-weight-bold temperature"
                        style={{ color: "#1C2331" }}
                      >
                        {" "}
                        0°C{" "}
                      </MDBTypography>
                      <span className="small" style={{ color: "#868B94" }}>
                        <MDBTypography tag="h5">Rainfall: <strong className="rainfall">0</strong></MDBTypography>
                      </span>
                    </div>
                    {/* <MDBTypography tag="h1"><strong className="temperature">0 °C</strong></MDBTypography>
                    <MDBTypography tag="h5">Rainfall: <strong className="rainfall">0</strong></MDBTypography> */}
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol md="10" lg="6" xl="6">
            <MDBCard className="custom-card text-white" style={{ borderRadius: "40px", height: "300px" }}>
              <div className="card-body p-2 h-100 d-flex align-items-center justify-content-center">
                <MapContainer
                  center={[lat, lon]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", borderRadius: "40px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat, lon]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                  <ChangeView center={[lat, lon]} zoom={13} />
                </MapContainer>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </section>
  );
}

export default PredictionPage;
