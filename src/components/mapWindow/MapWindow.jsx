import { useSelector } from "react-redux";
import { MapContainer, ImageOverlay, Marker, Polyline } from "react-leaflet";
import "./mapWindow.css";
import { Container } from "@mui/system";
import { LatLngBounds } from "leaflet";

export const MapWindow = () => {
  const { center, zoom, image, crs, imageBounds, marker } = useSelector(
    (store) => store.map
  );

  const bounds = new LatLngBounds(
    [40.712216, -74.22655],
    [40.773941, -74.12544]
  );

  console.log(bounds);
  return (
    <>
      <Container style={{ width: 800, height: 570, marginBottom: 100 }}>
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
          <ImageOverlay
            url="https://facts.net/wp-content/uploads/2020/09/peter-griffin-facts.png"
            bounds={imageBounds}
          />
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
