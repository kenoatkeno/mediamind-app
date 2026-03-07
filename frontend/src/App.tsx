import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewPlanPage from './pages/NewPlanPage';
import ResultsDashboard from './pages/ResultsDashboard';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Global Layout Wrapper */}
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Redirect root to the dashboard */}
          <Route path="/" element={<Navigate to="/app" replace />} />

          {/* Protected Application Routes */}
          <Route element={<ProtectedRoute />}>
            {/* The User Dashboard (Saved Plans) */}
            <Route path="/app" element={<UserDashboard />} />

            {/* The Strategist Conversational Input */}
            <Route path="/app/new-plan" element={<NewPlanPage />} />

            {/* Results Dashboard (Generated Plan) */}
            <Route path="/app/plan/:id" element={<ResultsDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
