// pages/trainings.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import './training.css'; // The single CSS file

// Define a type for our course object with the new 'upcoming' status
type Course = {
  id: string; 
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  whatYoullLearn: string[];
  status: 'open' | 'up coming' | 'closed'; // Corrected type
  googleFormUrl: string | null;
  imageUrl: string;
  qrCodeUrl: string | null;
};

const TrainingsPage = () => {
  // === STATE MANAGEMENT ===
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'up coming' | 'closed'>('all');

  // === COURSE DATA ===
  const courses: Course[] = [
    {
      id: 'data-analysis-2025',
      title: 'After-Work Data Analysis Program',
      description: "A hands-on course for professionals to make data-driven decisions.",
      status: 'open',
      googleFormUrl: 'https://forms.gle/XUxVLnJp4xWaA66z9',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      qrCodeUrl: '/QRcode.jpg', // Assumes my-qr-code.png is in your /public folder
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
      id: 'web-dev-intro-2025',
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build websites.',
      status: 'up coming',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      qrCodeUrl: null,
      duration: '6 Weeks',
      longDescription: 'Go from zero to hero in front-end web development.',
      whatYoullLearn: ['HTML5 & Semantics', 'CSS Flexbox & Grid', 'JavaScript DOM Manipulation', 'Making API Requests'],
    },
    {
      id: 'ml-workshop-2025',
      title: 'Advanced Machine Learning Workshop',
      description: 'A deep dive into advanced machine learning concepts and model deployment.',
      status: 'closed',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      qrCodeUrl: null,
      duration: '3 Weeks',
      longDescription: 'This workshop covers the latest techniques in machine learning.',
      whatYoullLearn: ['Deep Neural Networks', 'Reinforcement Learning', 'Model Deployment'],
    },
  ];

  // === DYNAMIC FILTERING LOGIC ===
  const filteredCourses = courses
    .filter(course => {
      if (activeFilter === 'all') return true;
      return course.status === activeFilter;
    })
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Effect to prevent background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = selectedCourse ? 'hidden' : 'auto';
  }, [selectedCourse]);

  const getStatusClass = (status: Course['status']) => {
    if (status === 'open') return 'card__status--open';
    if (status === 'up coming') return 'card__status--upcoming';
    return 'card__status--closed';
  };

  const getButtonForStatus = (course: Course) => {
    switch (course.status) {
      case 'open':
        return <a href={course.googleFormUrl!} target="_blank" rel="noopener noreferrer" className="card__button card__button--primary">Apply Now</a>;
      case 'up coming':
        return <button className="card__button card__button--secondary" disabled>Notify Me</button>;
      case 'closed':
        return <button className="card__button card__button--disabled" disabled>Closed</button>;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Our Training Programs</title>
        <meta name="description" content="Explore our list of professional training programs." />
      </Head>

      <main className="trainings-page__main">
        {/* --- HERO SECTION --- */}
        <div className="trainings-page__hero">
          <div className="hero__overlay"></div>
          <div className="hero__content">
            <h1 className="trainings-page__title">Our Training Programs</h1>
            <p className="trainings-page__subtitle">
              Find the perfect course to help you upskill and advance your career.
            </p>
          </div>
        </div>

        {/* --- FILTER AND SEARCH CONTROLS --- */}
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search for a course..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="status-filters">
            <button onClick={() => setActiveFilter('all')} className={activeFilter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setActiveFilter('open')} className={activeFilter === 'open' ? 'active' : ''}>Open</button>
            <button onClick={() => setActiveFilter('up coming')} className={activeFilter === 'up coming' ? 'active' : ''}>Upcoming</button>
            <button onClick={() => setActiveFilter('closed')} className={activeFilter === 'closed' ? 'active' : ''}>Closed</button>
          </div>
        </div>

        {/* --- COURSE GRID --- */}
        <div className="trainings-page__card-container">
          {filteredCourses.map((course) => (
            <div className="training-card" key={course.id}>
              <div className="card__image-container">
                <img src={course.imageUrl} alt={`Image for ${course.title}`} className="card__image" />
              </div>
              <div className="card__content">
                <div className="card__badges">
                  <span className={`card__status ${getStatusClass(course.status)}`}>{course.status}</span>
                  <span className="card__duration">{course.duration}</span>
                </div>
                <h2 className="card__title">{course.title}</h2>
                <p className="card__description">{course.description}</p>
              </div>
              <div className="card__footer">
                <button onClick={() => setSelectedCourse(course)} className="card__button card__button--secondary">
                  View Details
                </button>
                {getButtonForStatus(course)}
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE MESSAGE --- */}
        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <h3>No Courses Found</h3>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}
      </main>
      
      {/* --- PROFESSIONAL MODAL FOR DETAILS --- */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setSelectedCourse(null)}>&times;</button>
            <div className="details__header">
              <img src={selectedCourse.imageUrl} alt="" className="details__header-image" />
            </div>
            <div className="details__content">
              <div className="card__badges">
                <span className={`card__status ${getStatusClass(selectedCourse.status)}`}>{selectedCourse.status}</span>
                <span className="card__duration">{selectedCourse.duration}</span>
              </div>
              <h2 className="modal__title">{selectedCourse.title}</h2>
              <p className="details__long-description">{selectedCourse.longDescription}</p>
              <h3 className="details__section-header">What You'll Learn</h3>
              <ul className="details__learn-list">
                {selectedCourse.whatYoullLearn.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              {selectedCourse.status === 'open' && (
                <>
                  <h3 className="details__section-header">How to Apply</h3>
                  <div className="details__apply-section">
                    <div className="apply-methods__qr-code">
                      <img src={selectedCourse.qrCodeUrl!} alt="QR Code for application form" />
                    </div>
                    <div className="apply-methods__text">
                      <p>Scan the code or click the link below to open the application form.</p>
                      {getButtonForStatus(selectedCourse)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingsPage;