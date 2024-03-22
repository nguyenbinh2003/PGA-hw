import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container style={{ width: "100vw" }}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
