import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagList } from "../../features/tag/tagSlice";
import { useEffect } from "react";

export const TagWidget = () => {
  const { tagsStatus, tags } = useSelector((store) => store.tag);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tagsStatus === "idle") {
      dispatch(fetchTagList());
    }
  }, [tagsStatus, dispatch]);

  const contentColumn = [
    {
      field: "identificationCode",
      headerName: "Identification Code",
      width: 340,
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
            <IconButton variant="outlined" size="small" className="viewButton">
              <EditIcon className="icon" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>TagWidget</h1>
      <DataGrid
        sx={{ height: 400 }}
        rows={tags}
        getRowId={(row) => row.identificationCode}
        columns={contentColumn.concat(viewColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
