import { Box, Grid, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExploreIcon from "@mui/icons-material/Explore";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTag } from "../../features/tag/tagSlice";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export const DetailTagPage = () => {
  const { detailTag } = useSelector((store) => store.tag);

  const dispatch = useDispatch();

  console.log(detailTag.posizioni);

  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchTag(id));
  }, [dispatch]);

  const columns = [
    {
      field: "identificationCode",
      headerName: "identificationCode",
      width: 200,
    },
    { field: "latitudine", headerName: "Latitude", width: 200 },
    { field: "longitudine", headerName: "Longitude", width: 200 },
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
            <LocalOfferIcon /> Dettaglio Tag
          </Typography>
          <IconButton>
            <EditIcon sx={{ color: "#6439ff" }} />
          </IconButton>
        </Box>
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

        {/* PROBLEMA */}
        {detailTag.posizioni ? (
          <DataGrid
            getRowId={(row) => row.timestamp}
            rows={detailTag.posizioni}
            columns={columns}
            pageSize={10}
            sx={{ height: "auto" }}
          />
        ) : (
          <>
            <DataGrid
              getRowId={(row) => row.identificationCode}
              rows={[]}
              columns={columns}
              pageSize={10}
              sx={{ height: "auto" }}
            />
          </>
        )}
      </Box>
    </>
  );
};
