// pages/trainings.tsx
"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import './training.css'; // The single CSS file

// Define a type for our course object for better TypeScript support
type Course = {
  id: string; // Add a unique ID for tracking the expanded state
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  whatYoullLearn: string[];
  status: 'open' | 'closed';
  googleFormUrl: string | null;
  imageUrl: string;
};

const TrainingsPage = () => {
  // State to track the ID of the currently expanded card
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'data-analysis-2025',
      title: 'After-Work Data Analysis Program',
      description: "A hands-on course for professionals to make data-driven decisions.",
      status: 'open',
      googleFormUrl: 'https://forms.gle/XUxVLnJp4xWaA66z9',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '2 Months',
      longDescription: `Are you a working professional looking to upgrade your data skills without interrupting your day job? This after-work program is designed just for you! It's a hands-on, practical course tailored for professionals across different industries who want to make data-driven decisions, improve reporting, and become more competitive in today's digital economy.`,
      whatYoullLearn: [
        'Microsoft Excel and Google Sheets for Data Cleaning',
        'Power BI and Data Visualization Techniques',
        'Data Manipulation with SQL',
        'Communicating Data Insights',
        'Real-world case studies and hands-on exercises',
      ],
    },
    {
      id: 'ml-workshop-2025',
      title: 'Advanced Machine Learning Workshop',
      description: 'A deep dive into advanced machine learning concepts and model deployment.',
      status: 'closed',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '3 Weeks',
      longDescription: 'This workshop covers the latest techniques in machine learning.',
      whatYoullLearn: ['Deep Neural Networks', 'Reinforcement Learning', 'Model Deployment'],
    },
    {
      id: 'web-dev-intro-2025',
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build websites.',
      status: 'closed',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '6 Weeks',
      longDescription: 'Go from zero to hero in front-end web development.',
      whatYoullLearn: ['HTML5 & Semantics', 'CSS Flexbox & Grid', 'JavaScript DOM Manipulation', 'Making API Requests'],
    }
  ];

  // Function to handle expanding/collapsing a card
  const handleToggleDetails = (id: string) => {
    // If the clicked card is already open, close it. Otherwise, open it.
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <>
      <Head>
        <title>Our Training Programs</title>
        <meta name="description" content="Explore our list of professional training programs." />
      </Head>

      <main className="trainings-page__main">
        <div className="trainings-page__header">
          <h1 className="trainings-page__title">Our Training Programs</h1>
          <p className="trainings-page__subtitle">
            Upskill and advance your career with our expert-led courses.
          </p>
        </div>

        <div className="trainings-page__card-container">
          {courses.map((course) => {
            const isExpanded = expandedCardId === course.id;
            return (
              <div className={`training-card ${isExpanded ? 'training-card--expanded' : ''}`} key={course.id}>
                {/* This part of the card is always visible */}
                <div className="training-card__summary">
                  <div className="training-card__image-container">
                    <img src={course.imageUrl} alt={`Image for ${course.title}`} className="training-card__image" />
                    <span className={`training-card__status ${course.status === 'open' ? 'training-card__status--open' : 'training-card__status--closed'}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="training-card__content">
                    <h2 className="training-card__title">{course.title}</h2>
                    <p className="training-card__description">{course.description}</p>
                  </div>
                </div>

                {/* This section is hidden by default and expands on click */}
                <div className="training-card__details">
                  <div className="training-card__details-content">
                    <div className="detail-item">
                      <span className="detail-item__label">Duration:</span>
                      <span className="detail-item__value">{course.duration}</span>
                    </div>
                    <p className="detail-item__long-description">{course.longDescription}</p>
                    <h3 className="detail-item__learn-header">What You'll Learn</h3>
                    <ul className="detail-item__learn-list">
                      {course.whatYoullLearn.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                {/* The card footer now contains the toggle button and apply link */}
                <div className="training-card__footer">
                  <button onClick={() => handleToggleDetails(course.id)} className="training-card__toggle-button">
                    {isExpanded ? 'Hide Details' : 'View Details'}
                    <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
                  </button>
                  {course.status === 'open' && (
                    <a href={course.googleFormUrl!} target="_blank" rel="noopener noreferrer" className="training-card__link">
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default TrainingsPage;