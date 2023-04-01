import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagList } from "../../features/tag/tagSlice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const TagsTable = () => {
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
    {
      field: "memoria",
      headerName: "Memoria",
      width: 340,
    },
    {
      field: "frequenza",
      headerName: "Frequenza",
      width: 340,
    },
    {
      field: "portata",
      headerName: "Portata",
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
    <>
      <h1>Tags</h1>
      <DataGrid
        sx={{ height: 810 }}
        rows={tags}
        getRowId={(row) => row.identificationCode}
        columns={contentColumn.concat(viewColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </>
  );
};
