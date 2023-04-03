// STYLESHEETS
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

// REACT ROUTER DOM
import { Link } from "react-router-dom";

// REACT REDUX
import { fetchTagList } from "../../features/tag/tagSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const TagWidget = () => {
  const { tagsStatus, tags } = useSelector((store) => store.tag);

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
            <Link to={`tags/${params.row.identificationCode}`}>
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
    <div>
      <Typography variant="h4">Tags</Typography>
      <DataGrid
        sx={{ height: 320 }}
        rows={tags}
        getRowId={(row) => row.identificationCode}
        columns={contentColumn.concat(viewColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
