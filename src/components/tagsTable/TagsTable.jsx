import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagList } from "../../features/tag/tagSlice";
import { Container, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const TagsTable = () => {
  const { tagsStatus, tags, loading } = useSelector((store) => store.tag);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tagsStatus === "idle") {
      dispatch(fetchTagList());
    }
  }, []);

  const contentColumn = [
    {
      field: "identificationCode",
      headerName: "Identification Code",
      width: 300,
    },
    {
      field: "memoria",
      headerName: "Memoria",
      width: 300,
    },
    {
      field: "frequenza",
      headerName: "Frequenza",
      width: 300,
    },
    {
      field: "portata",
      headerName: "Portata",
      width: 300,
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
        Tags
      </Typography>
      {!loading ? (
        <DataGrid
          sx={{ height: 680 }}
          rows={tags}
          getRowId={(row) => row.identificationCode}
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
