import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";

import { publicRoutes, privateRoutes } from "./routes/routes";
import PrivateRouter from "./routes/privateRouter/priviteRouter";
import PublicRouter from "./routes/publicRouter/publicRouter";

function App() {
  return (
    <BrowserRouter>
      <Container style={{ width: "100vw" }} className="d-flex justify-content-center">
        <Routes>
          <Route element={<PublicRouter />}>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
          <Route element={<PrivateRouter />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
