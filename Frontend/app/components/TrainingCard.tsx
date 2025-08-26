// components/TrainingCard.tsx

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from '../styles/TrainingCard.module.css';

// Define the types for the component's props
interface TrainingCardProps {
  title: string;
  description: string;
  whatYoullLearn: string[];
  status: 'open' | 'closed';
  googleFormUrl?: string; // Optional: only needed if status is 'open'
}

const TrainingCard: React.FC<TrainingCardProps> = ({
  title,
  description,
  whatYoullLearn,
  status,
  googleFormUrl,
}) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.status} ${status === 'open' ? styles.open : styles.closed}`}>
        {status.toUpperCase()}
      </div>
      
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      
      <h3 className={styles.learnHeader}>What You’ll Learn</h3>
      <ul className={styles.learnList}>
        {whatYoullLearn.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Conditionally render the application section */}
      {status === 'open' && googleFormUrl && (
        <div className={styles.applicationSection}>
          <h3 className={styles.applyHeader}>Apply Now</h3>
          <p>This training is currently open for applications.</p>
          
          <div className={styles.applyMethods}>
            <div className={styles.applyLinkContainer}>
              <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Go to Application Form
              </a>
            </div>
            
            <div className={styles.applyQrContainer}>
              <h4>Scan to Apply</h4>
              <div className={styles.qrCode}>
                <QRCodeSVG value={googleFormUrl} size={150} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;