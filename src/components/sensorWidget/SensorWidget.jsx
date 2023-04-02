import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";
import { fetchSensorList } from "../../features/sensor/sensorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      width: 380,
    },
  ];

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{ display: "flex" }}>
            <Link to={`sensors/${params.row.identificationCode}`}>
              <IconButton
                variant="outlined"
                size="small"
                className="viewButton"
              >
                <EditIcon className="icon" />
              </IconButton>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "4%" }}>
      <Typography variant="h4">Sensors</Typography>
      <DataGrid
        sx={{ height: 320, width: 500 }}
        rows={sensors}
        getRowId={(row) => row.identificationCode}
        columns={contentColumn.concat(viewColumn)}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
};
