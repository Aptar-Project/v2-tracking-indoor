import { Box, Grid, Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import ExploreIcon from "@mui/icons-material/Explore";
import { DataGrid } from "@mui/x-data-grid";

export const DetailSensorPage = () => {
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
                <strong>Identification Code:</strong>
                {/*  {sensor.id} */}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Frequenza:</strong>
                {/*  {sensor.id} */}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Protocollo:</strong>
                {/*  {sensor.id} */}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="div">
              <Box sx={{ mb: 1 }}>
                <strong>Potenza Trasmissione:</strong> {/* {sensor.id} */}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Antenna:</strong> {/* {sensor.id} */}
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>Alimentazione:</strong>
                {/*  {sensor.id} */}
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
