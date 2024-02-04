import React from 'react';
import TypeWriter from 'react-typewriter';

const Resume = ({ data }) => {
  if (data) {
    var skillmessage = data.skillmessage;
    var education = data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3 style={{ color: '#fff' }}>{education.school}</h3>
          <p className='info' style={{ color: '#fff' }}>
            {education.degree} <span>&bull;</span>
            <em className='date' style={{ color: '#fff' }}>
              {education.graduated}
            </em>
          </p>
          <p style={{ color: '#000', fontWeight: 'bold' }}>
            {education.description}
          </p>
        </div>
      );
    });
    var work = data.work.map(function (work) {
      let companyImage = 'images/portfolio/' + work.pic;
      return (
        <div key={work.company}>
          <img
            src={`${companyImage}`}
            style={{
              height: '100%',
              width: '35%',
              textAlign: 'center',
              marginLeft: '-260px',
              marginBottom: '-180px',
              marginTop: '-60px',
            }}
          />
          <h3 style={{ color: '#fff' }}>{work.company}</h3>

          <p className='info' style={{ color: '#fff' }}>
            {work.title}
            <span>&bull;</span> <em className='date'>{work.years}</em>
          </p>
          <p style={{ color: '#000', fontWeight: 'bold' }}>
            {work.description.split('.').map((exp, i) => {
              return <li key={i}>{exp}</li>;
            })}
          </p>
        </div>
      );
    });
  }

  return (
    <section id='resume'>
      <div
        className='row education'
        style={{ border: '5px solid white', padding: '15px' }}
      >
        <div className='three columns header-col'>
          <h1>
            <span style={{ color: 'white' }}> Education</span>
          </h1>
        </div>

        <div className='nine columns main-col'>
          <div className='row item'>
            <div className='twelve columns'>{education}</div>
          </div>
        </div>
      </div>

      <div
        className='row work'
        style={{ border: '5px solid white', padding: '15px' }}
      >
        <div className='three columns header-col'>
          <h1>
            <span style={{ color: 'white' }}>Experience</span>
          </h1>
        </div>

        <div className='nine columns main-col'>{work}</div>
      </div>

      {/* <div className='row skill'>
        <div className='three columns header-col'>
          <h1>
            <span style={{ color: 'white' }}>Skills</span>
          </h1>
        </div> */}

      {/* <div className='nine columns main-col'>
          <p>{skillmessage}</p>

          <div className='bars'>
            <div id='skill-set'>
              <h3>Skills</h3>
              <ul className='vertical-list'>
                <li>
                  <ul
                    className='vertical-list skills'
                    id='web-development-skills'
                  >
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                  </ul>
                </li>
                <li>
                  <ul className='vertical-list skills' id='automation-skills'>
                    <li>AutoHotKey</li>
                  </ul>
                </li>

                <li>
                  <ul className='vertical-list skills' id='misc-skills'>
                    <li>Regular Expressions</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </section>
  );
};

export default Resume;
