import { dummyCapabilities, dummyQuestions, dummyResults } from '../../lib/dummy-data';
import '../styles/admin.css';

const AdminDashboardPage = () => {
  const totalCompanies = dummyResults.length;
  const averageScore = dummyResults.reduce((acc, result) => acc + result.score, 0) / totalCompanies;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Companies Assessed</h2>
          <p>{totalCompanies}</p>
        </div>
        <div className="card">
          <h2>Average Maturity Score</h2>
          <p>{averageScore.toFixed(2)}%</p>
        </div>
        <div className="card">
          <h2>Defined Capabilities</h2>
          <p>{dummyCapabilities.length}</p>
        </div>
        <div className="card">
          <h2>Assessment Questions</h2>
          <p>{dummyQuestions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;