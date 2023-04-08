import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routes'
import './styles/App.css'
import './styles/index.css'
import './styles/variable.css'
import './styles/common.css'
import { LicenseInfo } from "@mui/x-license-pro"
import Register from "./components/auth/Register.jsx";

LicenseInfo.setLicenseKey("61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=")

function App() {

  return (<>
    <Router>
      <Routing />
    </Router>
  </>)
}

export default App
