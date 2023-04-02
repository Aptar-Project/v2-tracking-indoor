import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";
import { fetchSensorList } from "../../features/sensor/sensorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const SensorWidget = () => {
  const { sensorStatus, sensors } = useSelector((store) => store.sensor);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sensorStatus === "idle") {
      dispatch(fetchSensorList());
    }
  }, [sensorStatus, dispatch]);

  const contentColumn = [
    {
      field: "identificationCode",
      headerName: "Identification Code",
      width: 340,
    },
  ];

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      with: 10,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{ display: "flex" }}>
            <IconButton variant="outlined" size="small" className="viewButton">
              <EditIcon className="icon" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Sensor Widget</h1>
      <DataGrid
        sx={{ height: 400 }}
        rows={sensors}
        getRowId={(row) => row.identificationCode}
        columns={contentColumn.concat(viewColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
