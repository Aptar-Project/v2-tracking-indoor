import { Container, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSensorList } from "../../features/sensor/sensorSlice";
import { Link } from "react-router-dom";

export const SensorTable = () => {
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
      width: 250,
    },
    {
      field: "latitudine",
      headerName: "Latitudine",
      width: 250,
    },
    {
      field: "longitudine",
      headerName: "Longitudine",
      width: 250,
    },
  ];

  const viewColumn = [
    {
      field: "actions",
      headerName: "Actions",
      with: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{ display: "flex" }}>
            <Link to={`${params.row.identificationCode}`}>
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
    <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
      <Typography variant="h3" gutterBottom>
        Sensors
      </Typography>
      <DataGrid
        sx={{ height: 680 }}
        getRowId={(row) => row.identificationCode}
        rows={sensors}
        columns={contentColumn.concat(viewColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Container>
  );
};
