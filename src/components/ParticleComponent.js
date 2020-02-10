import React from "react";
import Particles from "react-particles-js";
// import dollar from '../images/dollar.svg'

export default () => (
  <div
    style={{
      position: 'fixed',
      width: "100%",
      height: "100%",
      backgroundColor: "#dddddd"
    }}
  >
    <Particles
      height={window.outerHeight}
      params={{
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 80
            }
          },
          color: {
            value: ["#f5f5f5", "#88f3fa"], //set red, green and blue randomly
          },
          shape: {
            type: "circle",
            image: {
              src: "../../public/dollar.svg", // Set image path.
              width: 1, // Width and height don't decide size.
              height: 1 // They just decide aspect ratio.
            },
            stroke: {
              width: .9,
              color: "#ffffff"
            },
            polygon: {
              nb_sides: 15
            }
          },
          opacity: {
            value: .25,
            random: false, // Set to false in our case
            anim: {
              enable: false,
              speed: 10,
              opacity_min: 0.4,
              sync: false
            }
          },
          size: {
            value: 10,
            random: false,
            anim: {
              enable: false,
              speed: 10,
              size_min: 10,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 50,
            color: "#ffffff",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: .01,
            direction: "right",
            random: true,
            straight: false,
            out_mode: "in",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }}
    />
  </div>
);
