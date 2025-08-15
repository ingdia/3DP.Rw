import { dummyResults } from '../../../lib/dummy-data';
import '../../styles/admin.css';

const ResultsPage = () => {
  return (
    <div>
      <h1>Company Results</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Assessment Date</th>
            <th>Score (%)</th>
            <th>Maturity Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyResults.map((res) => (
            <tr key={res.id}>
              <td>{res.companyName}</td>
              <td>{res.assessmentDate}</td>
              <td>{res.score}</td>
              <td>
                <span className={`badge badge-${res.maturityLevel.toLowerCase()}`}>
                  {res.maturityLevel}
                </span>
              </td>
              <td>
                <button className="btn-primary">View Report</button>
                <button className="btn-secondary">Manage Certificate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;