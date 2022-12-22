import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TranslateIcon from "@mui/icons-material/Translate";
import TextArea from "antd/lib/input/TextArea";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Label } from "@mui/icons-material";
import { Col, Row } from "antd";
const languages = require("language-list")();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Muath Translator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const ListLang = () => {
  const langList: string[] = languages.getData();
  return (
    <FormControl sx={{ m: 1, width: "50%" }}>
      <select name="pets" id="pet-select">
        {langList.map((i) => (
          <option value={i.code}>{i.language}</option>
        ))}
      </select>
    </FormControl>
  );
};

const theme = createTheme();

export default function Album() {
  const [res, setRes] = React.useState("");
  const [language, setLanguage] = React.useState("ar");
  const [text, setText] = React.useState("");

  const run = (text: string) => {
    const options = {
      method: "POST",
      url: "https://translate-plus.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e367ccd301mshf84b571123e23b0p178fafjsn8c72bcc63cbc",
        "X-RapidAPI-Host": "translate-plus.p.rapidapi.com"
      },
      data: `{"text": "${text}","source":"en","target":"${language}"}`
    };
    console.log(options.data);
    axios
      .request(options)
      .then(async (response) => {
        console.log(response.data.translations.translation);
        setRes(response.data.translations.translation);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const [showLoader, setShowLoader] = React.useState(false);

  const handleTextChange = (text: string) => {
    setText(text);
    run(text);
  };

  React.useEffect(() => {
    handleTextChange(text);
  }, [text]);

  const handleShowLoader = () => {
    setShowLoader(true);
  };
  const handleHideLoader = () => {
    setShowLoader(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <img
            src="https://i.ibb.co/8sQ70xy/Untitled-design-6.png"
            width={80}
            alt="logo"
          />
          <Typography variant="h6" color="inherit" noWrap></Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Muath Translator
            </Typography>
          </Container>
        </Box>
        <Container style={{ alignContent: "center" }}>
          <Container>
            <Row>
              <Col md={4}>
                <Typography
                  sx={{ paddingTop: 2 }}
                  component="h5"
                  variant="h5"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Source language
                </Typography>
              </Col>

              <Col md={8}>
                <ListLang />
              </Col>
              <Col md={4}>
                <Typography
                  sx={{ paddingTop: 2 }}
                  component="h5"
                  variant="h5"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Target language
                </Typography>
              </Col>

              <Col md={8}>
                <ListLang />
              </Col>
            </Row>
            <Grid>
              <TextArea
                style={{ width: "45%", height: 250, margin: 3, fontSize: 25 }}
                placeholder="Enter Your Text Here"
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <TextArea
                readOnly
                style={{ width: "45%", height: 250, margin: 3, fontSize: 25 }}
                placeholder="Results here"
                value={res}
              />
            </Grid>
            <Grid style={{ padding: 10 }}>
              <Button
                className="p-1"
                color="secondary"
                variant="contained"
                onClick={() => handleTextChange(text)}
              >
                <TranslateIcon /> Translate
              </Button>
            </Grid>
          </Container>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Devloped by <Link href="">Muath A.Zoubi</Link>
        </Typography>
        <Copyright />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
