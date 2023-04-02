import { useDispatch, useSelector } from "react-redux";
import { MapContainer, ImageOverlay, Marker, Polyline } from "react-leaflet";
import { Container } from "@mui/system";
import "./mapWindow.css";
import { useEffect, useState } from "react";
import { fetchTagList } from "../../features/tag/tagSlice";
import { Typography } from "@mui/material";

export const MapWindow = () => {
  const { center, zoom, image, crs, imageBounds, marker } = useSelector(
    (store) => store.map
  );

  const dispatch = useDispatch();

  const { tags, tagsIcon } = useSelector((store) => store.tag);
  const { sensors, sensorIcon } = useSelector((store) => store.sensor);

  const [loadingPositions, setLoadingPositions] = useState(false);
  const [positionByTags, setPositionByTags] = useState([]);

  const [positionBySensors, setPositionBySensors] = useState([]);

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchTagList());
      setPositionByTags(
        tags.map((tag) =>
          tag.posizioni.map(
            ({ latitudine, longitudine, identificationCode, timestamp }) => {
              return { lat: latitudine, lng: longitudine };
            }
          )
        )
      );
    }, 11000);
  }, [tags]);

  return (
    <>
      <Container
        style={{ width: 750, height: 700, marginBottom: 100, marginTop: "5%" }}
      >
        <Typography variant="h2">Map</Typography>
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
              {/* {positionByTags[0] ? (
                <>
                  <Polyline
                    pathOptions={{
                      color:
                        "#" + Math.floor(Math.random() * 16777215).toString(16),
                    }}
                    positions={positionByTags[index]}
                  />
                </>
              ) : (
                <>
                  <Polyline pathOptions={{ color: "red" }} positions={[]} />
                </>
              )} */}
            </div>
          ))}
          {sensors.map((sensor) => (
            <Marker
              key={sensor.identificationCode}
              icon={sensorIcon}
              position={{
                lat: sensor.posizione.latitudine,
                lng: sensor.posizione.longitudine,
              }}
            />
          ))}
        </MapContainer>
      </Container>
    </>
  );
};
