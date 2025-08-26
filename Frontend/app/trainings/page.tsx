// pages/trainings.tsx

import React from 'react';
import Head from 'next/head';
// Make sure your CSS file is in the same directory or adjust the path
import './training.css'; 

const TrainingsPage = () => {
  // Refined: Course data is now in a clean, scalable array
  const courses = [
    {
      title: 'After-Work Data Analysis Program',
      description: "A hands-on course for professionals to make data-driven decisions.",
      status: 'open',
      googleFormUrl: 'https://forms.gle/XUxVLnJp4xWaA66z9',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Advanced Machine Learning Workshop',
      description: 'A deep dive into advanced machine learning concepts and model deployment.',
      status: 'closed',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build websites.',
      status: 'closed',
      googleFormUrl: null,
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  ];

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

        {/* The card container now automatically creates a grid */}
        <div className="trainings-page__card-container">
          {/* We loop through the array, making the code much cleaner */}
          {courses.map((course, index) => (
            <div className="training-card" key={index}>
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
              <div className="training-card__footer">
                {course.status === 'open' ? (
                  // The '!' tells TypeScript that googleFormUrl won't be null here
                  <a href={course.googleFormUrl!} target="_blank" rel="noopener noreferrer" className="training-card__link">
                    Apply Now
                  </a>
                ) : (
                  <button className="training-card__link training-card__link--disabled" disabled>
                    Applications Closed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default TrainingsPage;