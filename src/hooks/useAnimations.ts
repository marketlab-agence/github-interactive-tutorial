import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useAnimations = () => {
  const controls = useAnimation();

  const fadeInUp = async (delay = 0) => {
    await controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay }
    });
  };

  const slideInLeft = async (delay = 0) => {
    await controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay }
    });
  };

  const scaleIn = async (delay = 0) => {
    await controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay }
    });
  };

  const staggerChildren = async (staggerDelay = 0.1) => {
    await controls.start({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    });
  };

  const pulse = () => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  };

  const bounce = () => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  };

  return {
    controls,
    fadeInUp,
    slideInLeft,
    scaleIn,
    staggerChildren,
    pulse,
    bounce
  };
};

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
          });
        }
      },
      { threshold }
    );

    return () => observer.disconnect();
  }, [controls, threshold]);

  return controls;
};