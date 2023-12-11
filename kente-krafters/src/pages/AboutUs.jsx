import React from 'react';
import { PRODUCTS } from "../utils/data";


const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2>About Us</h2>
      <p>
        Welcome to our company! We are a passionate team dedicated to providing
        high-quality products/services.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
};

export default AboutUs;