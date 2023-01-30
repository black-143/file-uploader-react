import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Table from "./components/Table.component";
import "./App.css";

function App() {
  const [signedData, setSignedData] = useState({});
  return (
    <div className="App">
      <header className="App-header">
        <h1>File Uploader</h1>
        {Object.keys(signedData).length === 0 && (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setSignedData(jwt_decode(credentialResponse.credential));
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
        <Table signedData={signedData}/>
      </header>
    </div>
  );
}

export default App;