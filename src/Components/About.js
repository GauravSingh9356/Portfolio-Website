import React from 'react';

const About = ({ data }) => {
  if (data) {
    var name = data.name;
    var profilepic = 'images/' + data.image;
    var bio = data.bio.split('3');
    var beforeStar = bio[0];
    var afterStar = bio[1];

    var phone = data.phone;
    var email = data.email;
    var resumeDownload = data.resumedownload;
  }

  return (
    <section id='about'>
      <div className='row'>
        <div className='three columns imgC'>
          <img
            className='profile-pic'
            src={profilepic}
            alt="Gaurav's Profile Pic"
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '100%',
            }}
          />
        </div>
        <div className='nine columns main-col'>
          <h2>About Me</h2>

          <div
            style={{
              background: '#fff',
              boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',

              borderRadius: '50px',
              // backdropFilter: 'blur(14px)',
              // backgroundColor: 'rgba(255, 255, 255, 0.2)',
              // padding: '10px',
              textAlign: 'center',
            }}
          >
            {' '}
            <p
              style={{
                fontSize: '16px',
                border: '5px solid #fff',
                padding: '15px',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {beforeStar}3 &#9734;{afterStar}
            </p>
          </div>

          <div className='row' style={{ marginTop: '40px' }}>
            <div className='columns contact-details'>
              <h2>Contact Details</h2>
              <p
                className='address'
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                <span>{name}</span>
                <br />

                <span>{phone}</span>
                <br />
                <span>{email}</span>
              </p>
            </div>
            <div className='columns download'>
              <p>
                <a
                  href={resumeDownload}
                  className='button'
                  target='_blank'
                  style={{
                    background: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  <i className='fa fa-download'></i>Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
