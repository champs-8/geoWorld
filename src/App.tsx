import {GetHourNow, GetLocationIp} from "./components/LocationData";

function App() {

  return (
    <div className="App">
        <div className="container">
            <header className="header">
                <nav>
                  <ul>
                    <li>Buscar</li>
                    <li>Contato</li>
                    <li>Sobre</li>
                  </ul>
                </nav>

                <input type="text" name="country" id="country" placeholder="Brazil"/>
                <button type="submit">Search</button>
                <div className="infosIP">
                  <GetHourNow/>
                  <GetLocationIp/>
                </div>
            </header>
        </div>
    </div>
  );
}

export default App;
