import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ClientList from './components/ClientList';
import CreateClient from './components/CreateClient';
import EditClient from './components/EditClient';
import PlanList from './components/PlanList';
import CreatePlan from './components/CreatePlan';
import EditPlan from './components/EditPlan';
import PolicyList from './components/PolicyList';
import CreatePolicy from './components/CreatePolicy';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-5">Bienvenido al Sistema de Seguros</h1>} />

          <Route path="/clientes" element={<ClientList />} />
          <Route path="/clientes/new" element={<CreateClient />} />
          <Route path="/clientes/edit/:id" element={<EditClient />} />

          <Route path="/planes" element={<PlanList />} />
          <Route path="/planes/new" element={<CreatePlan />} />
          <Route path="/planes/edit/:id" element={<EditPlan />} />

          <Route path="/polizas" element={<PolicyList />} />
          <Route path="/polizas/new" element={<CreatePolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
