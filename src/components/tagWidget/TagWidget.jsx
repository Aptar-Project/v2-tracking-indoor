import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagList } from "../../features/tag/tagSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const TagWidget = () => {
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
                <EditIcon className="icon" />
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
