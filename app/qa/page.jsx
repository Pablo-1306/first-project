"use client";
import {
  Box,
  useTheme,
  Typography,
  InputAdornment,
  Container,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccordionComp from "../components/accordion";

export default function Home() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" disableGutters sx={{ mb: 5 }}>
      <Box
        sx={{
          position: "relative",
          width: "95%",
          height: "60vh",
          mx: "2.5%",
        }}
      >
        <Image
          src="/support_team.jpeg"
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", mb: 3, fontWeight: "bold" }}
          >
            We are here to help you:
          </Typography>
          <OutlinedInput
            placeholder="Search Questions"
            size="large"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              maxWidth: "45%",
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
      </Box>

      <Box sx={{ mt: 10, mb: 15 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <RocketLaunchIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Getting Started
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <ManageAccountsIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Account Administration
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <RequestQuoteIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Plans & Billing
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <SecurityIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Security
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <GroupsIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Cooperative management
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <QueryStatsIcon
                sx={{
                  width: "150px",
                  height: "150px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Comprehensible graphics
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: "80%", margin: "auto", mt: 5 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Frequently asked questions
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "text.secondary", mb: 4 }}
        >
          Exercitation dolore reprehenderit fugi
        </Typography>

        <AccordionComp
          title={"I can't log in"}
          body={
            "If you are having trouble logging in to a service instance or see messages about tokens, such as unable to fetch access token or 400 bad request - header or cookie too large, it might mean that you need to clear your browser cache. Open a private browser window, and then try again."
          }
        />
        <AccordionComp
          title={"I don't see the analytics page"}
          body={
            "To view the Analytics page, you must have a service role of Manager and a platform role of at least Viewer. For more information about access roles and how to request an access role change, please contact support."
          }
        />
        <AccordionComp
          title={"Can i change my plan?"}
          body={
            "Yes it is possible, to do so, please contact the support team to make the charge and the corresponding update."
          }
        />
        <AccordionComp
          title={
            "Is it possible to see the monthly requests of my microservices?"
          }
          body={
            "Only the superuser can see the Analytics page, inside you will find the data and graphs that correspond to the consumption of your microservices."
          }
        />
        <AccordionComp
          title={"Can i download charts?"}
          body={"Of course, you just have to click on the download button."}
        />
      </Box>
    </Container>
  );
}
