import { LegendTable } from "../../components/legendTable/LegendTable";
import { SensorWidget } from "../../components/sensorWidget/SensorWidget";
import { TagWidget } from "../../components/tagWidget/TagWidget";
import { MapWindow } from "../../components/mapWindow/MapWindow";
import "./mapPage.css";
import "leaflet/dist/leaflet.css";

export const MapPage = () => {
  return (
    <div className="content">
      <div>
        <MapWindow />
        <LegendTable />
      </div>
      <div>
        <TagWidget />
        <SensorWidget />
      </div>
    </div>
  );
};
