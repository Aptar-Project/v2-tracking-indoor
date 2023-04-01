import { useSelector } from "react-redux";
import { MapContainer, ImageOverlay, Marker, Polyline } from "react-leaflet";
import { Container } from "@mui/system";
import "./mapWindow.css";

export const MapWindow = () => {
  const { center, zoom, image, crs, imageBounds, marker } = useSelector(
    (store) => store.map
  );

  return (
    <>
      <Container style={{ width: 800, height: 400, marginBottom: 100 }}>
        <h1>Mappa</h1>
        <MapContainer
          className="map-container"
          center={center}
          zoom={zoom}
          crs={crs}
          minZoom={0}
          maxZoom={0}
          zoomSnap={0.25}
          dragging={false}
          doubleClickZoom={() => disable}
        >
          <ImageOverlay url={image} bounds={imageBounds} />
          {/* {users.map((user, index) => (
            <>
              <Marker
                key={user.identificationCode}
                icon={userIcon}
                position={{
                  lat: user.posizioni[user.posizioni.length - 1].latitudine,
                  lng: user.posizioni[user.posizioni.length - 1].longitudine,
                }}
              />

              <Polyline
                pathOptions={{ color: "red" }}
                positions={positionByUsers[index]}
              />
            </>
          ))}
          {sensors.map((sensor) => (
            <Marker
              key={sensor.identificationCode}
              icon={sensorIcon}
              position={{
                lat: 0,
                lng: 0,
              }}
            />
          ))} */}
        </MapContainer>
      </Container>
    </>
  );
};
