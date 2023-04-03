// REDUX
import { useSelector } from "react-redux";

// STYLESHEETS
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const LegendTable = () => {
  const { rows } = useSelector((store) => store.legend);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Legend
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div>
                    <img
                      src={`${row.icon}`}
                      alt="user"
                      style={{ height: 40 }}
                    />
                  </div>
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
