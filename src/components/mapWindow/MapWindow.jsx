import { useSelector } from "react-redux";
import { MapContainer, ImageOverlay, Marker, Polyline } from "react-leaflet";
import { Container } from "@mui/system";
import "./mapWindow.css";
import { useEffect, useState } from "react";

export const MapWindow = () => {
  const { center, zoom, image, crs, imageBounds, marker } = useSelector(
    (store) => store.map
  );

  const { tags, tagsIcon } = useSelector((store) => store.tag);

  const [loadingPositions, setLoadingPositions] = useState(false);
  const [positionByTags, setPositionByTags] = useState([]);

  useEffect(() => {
    setInterval(
      setPositionByTags(
        tags.map((tag) =>
          tag.posizioni.map(
            ({ latitudine, longitudine, identificationCode, timestamp }) => {
              return { lat: latitudine, lng: longitudine };
            }
          )
        )
      ),
      1000
    );
  }, [tags]);

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
          {tags.map((tag, index) => (
            <div key={index}>
              <Marker
                icon={tagsIcon}
                position={{
                  lat: tag.posizioni[tag.posizioni.length - 1].latitudine,
                  lng: tag.posizioni[tag.posizioni.length - 1].longitudine,
                }}
              />
              {positionByTags[0] ? (
                <>
                  <Polyline
                    pathOptions={{ color: "red" }}
                    positions={positionByTags[index]}
                  />
                </>
              ) : (
                <>
                  <Polyline pathOptions={{ color: "red" }} positions={[]} />
                </>
              )}

              {/* {tags[0] ? (
                <Polyline
                  pathOptions={{ color: "red" }}
                  positions={positionByTags[index]}
                />
              ) : (
                <></>
              )} */}
            </div>
          ))}
          {/* {sensors.map((sensor) => (
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
