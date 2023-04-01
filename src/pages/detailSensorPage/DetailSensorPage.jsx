import { Box, Grid, Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import ExploreIcon from "@mui/icons-material/Explore";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSensor } from "../../features/sensor/sensorSlice";
import { useParams } from "react-router-dom";

export const DetailSensorPage = () => {
  const { detailSensor } = useSelector((store) => store.sensor);

  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchSensor(id));
  }, [dispatch]);

  const columns = [
    { field: "latitude", headerName: "Latitude", width: 200 },
    { field: "longitude", headerName: "Longitude", width: 200 },
    { field: "timestamp", headerName: "Timestamp", width: 300 },
  ];
  return (
    <>
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}
        margin={4}
        marginTop={5}
        maxWidth={1000}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
          marginBottom={5}
          paddingBottom={4}
        >
          <Typography variant="h4">
            <SensorsIcon /> Dettaglio Sensore
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component="div">
              <Box sx={{ mb: 1 }}>
                <strong>Identification Code: </strong>
                {detailSensor.identificationCode}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Frequenza: </strong>
                {detailSensor.frequenza}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Protocollo: </strong>
                {detailSensor.protocollo}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="div">
              <Box sx={{ mb: 1 }}>
                <strong>Potenza Trasmissione: </strong>
                {detailSensor.potenzaTrasmissione}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Antenna: </strong> {detailSensor.antenna}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Alimentazione: </strong>
                {detailSensor.alimentazione}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}
        margin={4}
        marginTop={5}
        maxWidth={1000}
      >
        <Typography variant="h4" gutterBottom>
          <ExploreIcon /> Cronologia Posizioni
        </Typography>
        <DataGrid
          rows={[]}
          columns={columns}
          pageSize={10}
          sx={{ height: "auto" }}
        />
      </Box>
    </>
  );
};
