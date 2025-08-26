// pages/trainings.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import './training.css'; // The single CSS file

type Course = {
  id: string; 
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  whatYoullLearn: string[];
  status: 'open' | 'up coming' | 'closed';
  googleFormUrl: string | null;
  imageUrl: string;
  qrCodeUrl: string | null;
};

const TrainingsPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'up coming' | 'closed'>('all');

  const courses: Course[] = [
    {
      id: 'data-analysis-2025',
      title: 'After-Work Data Analysis Program',
      description: "A hands-on course for professionals to make data-driven decisions.",
      status: 'open',
      googleFormUrl: 'https://forms.gle/XUxVLnJp4xWaA66z9',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      qrCodeUrl: '/QRcode.jpg',
      duration: '2 Months',
      longDescription: `This practical course is for professionals across industries who want to make data-driven decisions, improve reporting, and become more competitive. Whether you're in health, education, finance, or government, this training will help you use data effectively.`,
      whatYoullLearn: [
        'Excel & Google Sheets for Data Analysis',
        'Power BI & Data Visualization',
        'Data Manipulation with SQL',
        'Communicating Data Insights',
        'Real-world case studies',
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

  const filteredCourses = courses
    .filter(course => {
      if (activeFilter === 'all') return true;
      return course.status === activeFilter;
    })
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCourse(null);
      }
    };
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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
        <div className="trainings-page__hero">
          <div className="hero__overlay"></div>
          <div className="hero__content">
            <h1 className="trainings-page__title">Our Training Programs</h1>
            <p className="trainings-page__subtitle">
              Find the perfect course to help you upskill and advance your career.
            </p>
          </div>
        </div>

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

        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <h3>No Courses Found</h3>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}
      </main>
      
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          {/* === BUTTON MOVED HERE === */}
          {/* It is now a sibling of modal-content, not a child. */}
          <button className="modal-close-button" onClick={() => setSelectedCourse(null)}>&times;</button>
          
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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