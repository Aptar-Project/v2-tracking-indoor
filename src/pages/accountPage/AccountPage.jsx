// STYLESHEETS
import { Container, Paper, Box, Avatar, Grid, Typography } from "@mui/material";
import { MoonLoader } from "react-spinners";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAccountByEmail } from "../../features/user/userSlice";

export const AccountPage = () => {
  const { account, accountStatus, loading } = useSelector(
    (store) => store.user
  );

  const dispatch = useDispatch();
  const [accountUser, setAccountUser] = useState({});

  useEffect(() => {
    if (accountStatus === "idle") {
      dispatch(fetchAccountByEmail());
    }
    setAccountUser(account);
  }, [accountStatus, dispatch, account]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
      <Paper elevation={3}>
        <Typography
          variant="h2"
          style={{
            marginLeft: "2em",
            paddingTop: "1em",
          }}
        >
          Account
        </Typography>
        {!loading ? (
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "10em",
                  height: "10em",
                }}
              >
                <Avatar
                  sx={{ width: 130, height: 130 }}
                  src={"" + accountUser?.immagineUtente + ""}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Nome: {accountUser.nome}</h3>
              <h3>Cognome: {accountUser.cognome}</h3>
              <h3>Email: {accountUser.email}</h3>
              <h3>
                Indirizzo:{" "}
                {accountUser.indirizzo ? (
                  <>
                    {accountUser.indirizzo.via},{" "}
                    {accountUser.indirizzo.numeroCivico}{" "}
                    {accountUser.indirizzo.cap} {accountUser.indirizzo.citta}{" "}
                    {accountUser.indirizzo.nazione}
                  </>
                ) : (
                  "Non disponibile"
                )}
              </h3>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3></h3>
              <h3></h3>
              <h3></h3>
              <h3></h3>
              <h3></h3>
              <h3></h3>
              <h3></h3>
              <h3></h3>
            </Grid>
          </Grid>
        ) : (
          <div
            style={{
              marginLeft: "40%",
              marginTop: "10%",
              paddingBottom: 40,
            }}
          >
            <MoonLoader
              color={"#3a3a47"}
              loading={loading}
              size={100}
              className="centra"
            />
          </div>
        )}
      </Paper>
    </Container>
  );
};
