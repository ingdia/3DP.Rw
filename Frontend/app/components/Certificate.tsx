import React from 'react';
import { Award } from 'lucide-react';
import './certificate.css'; // Dedicated styles for the certificate

interface CertificateProps {
  companyName: string;
  score: number;
  issueDate: string;
}

export default function Certificate({ companyName, score, issueDate }: CertificateProps) {
  return (
    <div className="certificate-container">
      <div className="certificate-border">
        <div className="certificate-content">
          <div className="certificate-header">
            <span className="subtitle">Certificate of Achievement</span>
            <h1 className="title">Data Maturity Excellence</h1>
          </div>

          <p className="award-text">This certificate is proudly presented to</p>
          <h2 className="company-name-cert">{companyName}</h2>
          <p className="achievement-text">
            For demonstrating outstanding performance and achieving a score of <strong>{score}%</strong> in our comprehensive Data Maturity Assessment.
          </p>

          <div className="certificate-footer">
            <div className="issue-date">
              <p><strong>Issued On:</strong></p>
              <p>{issueDate}</p>
            </div>
            <div className="seal">
              <Award size={40} />
              <span>OFFICIAL SEAL</span>
            </div>
            <div className="signature">
              <p><strong>Authorized By:</strong></p>
              <p>3DP Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}