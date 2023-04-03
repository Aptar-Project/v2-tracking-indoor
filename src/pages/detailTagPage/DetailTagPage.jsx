import { Box, Button, Container, Grid, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExploreIcon from "@mui/icons-material/Explore";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTag } from "../../features/tag/tagSlice";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { MoonLoader } from "react-spinners";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export const DetailTagPage = () => {
  const { detailTag, loading } = useSelector((store) => store.tag);

  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchTag(id));
  }, []);

  const handleReload = () => {
    dispatch(fetchTag(id));
  };

  const columns = [
    {
      field: "identificationCode",
      headerName: "identificationCode",
      width: 300,
    },
    { field: "latitudine", headerName: "Latitude", width: 100 },
    { field: "longitudine", headerName: "Longitude", width: 100 },
    { field: "timestamp", headerName: "Timestamp", width: 300 },
  ];
  return (
    <Container maxWidth="xl">
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}
        margin={4}
        marginTop={7}
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
            <LocalOfferIcon /> Dettaglio Tag
          </Typography>
          <IconButton>
            <EditIcon sx={{ color: "#6439ff" }} />
          </IconButton>
        </Box>
        {!loading ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography component="div">
                <Box sx={{ mb: 1 }}>
                  <strong>Identification Code: </strong>
                  {detailTag.identificationCode}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Frequenza: </strong>
                  {detailTag.frequenza}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Portata:</strong> {detailTag.portata}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Alimentazione:</strong> {detailTag.alimentazione}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component="div">
                <Box sx={{ mb: 1 }}>
                  <strong>Resistenza Ambientale:</strong> {detailTag.resistenza}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Memoria:</strong> {detailTag.portata}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Chip:</strong> {detailTag.portata}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <strong>Antenna:</strong> {detailTag.portata}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <div style={{ marginLeft: "50%" }}>
            <MoonLoader
              color={"#3a3a47"}
              loading={loading}
              size={100}
              className="centra"
            />
          </div>
        )}
      </Box>
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}
        margin={4}
        marginTop={5}
      >
        <Typography variant="h4" gutterBottom>
          <ExploreIcon /> Cronologia Posizioni
          <Button
            variant="contained"
            size="small"
            startIcon={<AutorenewIcon />}
            onClick={() => handleReload()}
            sx={{
              backgroundColor: "#6439ff",
              marginX: 5,
              "&:hover": {
                backgroundColor: "#6439ff",
              },
            }}
          >
            Reload
          </Button>
        </Typography>

        {detailTag.posizioni ? (
          <DataGrid
            getRowId={(row) => row.identificationCode}
            rows={[...detailTag.posizioni]}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            sx={{ height: 1000 }}
            disableColumnMenu
          />
        ) : (
          <Container>
            <div style={{ marginLeft: "50%" }}>
              <MoonLoader
                color={"#3a3a47"}
                loading={loading}
                size={100}
                className="centra"
              />
            </div>
          </Container>
        )}
      </Box>
    </Container>
  );
};
