import React from 'react';

const Footer = ({ data }) => {
  if (data) {
    var networks = data.social.map(function (network) {
      return (
        <li key={network.name} style={{ marginLeft: '20px' }}>
          <a
            href={network.url}
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
  }

  return (
    <div style={{ background: '#000' }}>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          margin: '0 auto',
          alignItems: 'center',
          width: '80%',
          justifyContent: 'space-between',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {networks}
        </ul>

        <ul className='copyright'>
          <li>
            Made by{' '}
            <a title='Gaurav' href='https://github.com/gauravsingh9356'>
              Gaurav Singh
            </a>
          </li>
        </ul>
      </div>
      {/* <div id='go-top'>
        <a className='smoothscroll' title='Back to Top' href='#home'>
          <i className='icon-up-open'></i>
        </a>
      </div> */}
    </div>
  );
};

export default Footer;
