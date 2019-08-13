import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Velib from "./components/velib";
import "./App.css";

const App: React.FC = () => {
  return <Velib />;
};

export { App };
export default GoogleApiWrapper({
  apiKey: "AIzaSyD7fqhPuLV6HNyLtwQnKB8WMQyuAbME45g"
})(Velib);
