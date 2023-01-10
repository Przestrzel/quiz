import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../../utils/config';
import Layout from '../layout/Layout';
import QuestionsPage from '../pages/QuestionsPage';
import StartPage from '../pages/StartPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<StartPage />} />
          <Route path={routes.game} element={<QuestionsPage />} />
          <Route />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
