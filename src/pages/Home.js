import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import API from '../utils/api';
import useScrollAnimation from '../utils/useScrollAnimation';

const Home = () => {
  const [content, setContent] = useState(null);

  // Initialise scroll progress bar + scroll-reveal observer
  useScrollAnimation();

  useEffect(() => {
    API.get('/portfolio').then(r => setContent(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <Navbar />
      <Hero data={content} />
      <Services data={content} />
      <Team data={content} />
      <Certificates />
      <Contact data={content} />
      <Footer data={content} />
    </div>
  );
};

export default Home;
