import React from "react";
import Particles from "react-particles-js";
import dollar from '../images/dollar.svg'

export default () => (
  <div
    style={{
      position: 'fixed',
      width: "100%",
      height: "100%",
      backgroundColor: "#97c6d9"
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
              value_area: 800
            }
          },
          color: {
            value: "#fff", //set white in HEX (We are using this version)
            value: { r: 255, g: 255, b: 255 }, //set white in RGB
            value: { h: 0, s: 100, l: 100 }, //set white in HSL
            value: ["#f00", "#0f0", "#00f"], //set red, green and blue randomly
            value: "random" //set colors randomly
          },
          shape: {
            type: "edge",
            image: {
              src: "../../public/dollar.svg", // Set image path.
              width: 100, // Width and height don't decide size.
              height: 100 // They just decide aspect ratio.
            },
            stroke: {
              width: 10,
              color: "#b0b0b0"
            },
            polygon: {
              nb_sides: 15
            }
          },
          opacity: {
            value: 1,
            random: true, // Set to false in our case
            anim: {
              enable: true,
              speed: 0.3,
              opacity_min: 0.4,
              sync: false
            }
          },
          size: {
            value: 6000,
            random: false,
            anim: {
              enable: true,
              speed: 10,
              size_min: 10,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 200,
            color: "#fff",
            opacity: 1,
            width: 4
          },
          move: {
            enable: true,
            speed: .1,
            direction: "right",
            random: false,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
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
              distance: 1,
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
