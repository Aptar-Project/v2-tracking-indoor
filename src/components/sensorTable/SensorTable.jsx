// STYLESHEETS
import { DataGrid } from "@mui/x-data-grid";
import { Container, IconButton, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { MoonLoader } from "react-spinners";

// REACT ROUTER DOM
import { Link } from "react-router-dom";

// REACT REDUX
import { fetchSensorList } from "../../features/sensor/sensorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const SensorTable = () => {
  const { sensorStatus, sensors, loading } = useSelector(
    (store) => store.sensor
  );

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
      field: "frequenza",
      headerName: "Frequenza",
      width: 250,
    },
    {
      field: "protocollo",
      headerName: "Protocollo",
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
                <ArrowOutwardIcon className="icon" />
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
      {!loading ? (
        <DataGrid
          sx={{ height: 680 }}
          getRowId={(row) => row.identificationCode}
          rows={sensors}
          columns={contentColumn.concat(viewColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      ) : (
        <div style={{ marginLeft: "40%", marginTop: "10%" }}>
          <MoonLoader
            color={"#3a3a47"}
            loading={loading}
            size={200}
            className="centra"
          />
        </div>
      )}
    </Container>
  );
};
