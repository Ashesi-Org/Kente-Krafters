import React from 'react';
import { PRODUCTS } from '../utils/data';
import aboutImage from '../assets/carousel_img_2.jpg'; // Import a relevant image

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>About Us</h2>
        <div style={styles.content}>
          <p style={styles.text}>
          Family
As a family enterprise that has been sustained three generations down, it has been an undulating journey. For just like the kente fabric in itself, with time comes growth and with this growth befalls struggle. In the recent past, this enterprise had been threatened by fires which sought to end the three generation-long business. 

However, we at Woven present an answer to ensuring the sustenance that was started by our forefathers, by taking kente digital and providing a widened market for it; both in Ghana and across the continent. 

With you in mind, we extend an invitation to join our family and take this journey of growth and sustenance with us, by being our loyal customers.
          </p>
          <p style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    backgroundImage: `url(${aboutImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: '10px',
    padding: '40px',
   
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#fff',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#fff',
    marginBottom: '15px',
  },
};

export default AboutUs;
