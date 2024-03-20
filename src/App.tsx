import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
