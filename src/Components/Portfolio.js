import React from 'react';
import { Button } from '@material-ui/core';

const Portfolio = ({ data }) => {
  if (data) {
    var projects = data.projects.map(function (projects) {
      var projectImage = 'images/portfolio/' + projects.image;

      return (
        <div>
          <div className='col-lg-6 project'>
            <a className='project-link' href={projects.url} target='_blank'>
              <img
                className='img-fluid project-image'
                src={projectImage}
                alt='...'
              />
            </a>
          </div>
          <div className='col-lg-6'>
            <div className='text-center h-100 project'>
              <div className='d-flex h-100'>
                <div className='project-text w-100 my-auto text-center text-lg-left'>
                  <h4 style={{ color: '#fff' }}>{projects.title}</h4>

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
                    <p
                      className='mb-0'
                      style={{
                        fontSize: '15px',
                        border: '1.5px solid white',
                        padding: '10px',
                        boxShadow: '2px 2px 2px 2px #fff',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {projects.description}
                    </p>
                  </div>

                  <h4 style={{ color: 'white' }}>Tech Stack Used </h4>
                  <p
                    className='mb-0 text-white-50'
                    style={{ fontSize: '15px' }}
                  >
                    {projects.skills.map((skill) => {
                      return <img src={`${skill}`} />;
                    })}
                  </p>
                  <button
                    style={{
                      padding: '16px',
                      fontSize: '15px',
                      background: '#000',
                    }}
                    className='button'
                    onClick={() => window.open(projects.url)}
                  >
                    See Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <section className='projects-section bg-light' id='projects'>
      <div className='row gx-0 mb-5 mb-lg-0 justify-content-center'>
        <div
          className='container px-4 px-lg-5'
          style={{ border: '5px solid #fff' }}
        >
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2 style={{ color: 'white' }}>Projects</h2>
          </div>
          {/* <div className="row gx-0 justify-content-center">
                    <div className="col-lg-6"><img class="img-fluid" src="assets/img/demo-image-02.jpg" alt="..." /></div>
                    <div className="col-lg-6 order-lg-first">
                        <div className="bg-black text-center h-100 project">
                            <div className="d-flex h-100">
                                <div className="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 className="text-white">Mountains</h4>
                                    <p className="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                                    <hr className="d-none d-lg-block mb-0 me-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

          {projects}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
