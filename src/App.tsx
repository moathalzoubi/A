import * as React from "react";
import { version, Button } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createIntl, RawIntlProvider } from "react-intl";
import "antd/dist/antd.min.css";

import { HomePage } from "./pages/Home";
import Bar from "./pages/Bar";

import "./styles.css";
import Album from "./pages/Bar";

export default function App() {
  return (
    <>
      <Album />
    </>
  );
}
