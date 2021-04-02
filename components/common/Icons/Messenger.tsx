interface BikeProps {
  className: string;
}

const Bike = ({ className }: BikeProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
    >
      <radialGradient
        id="Gradient"
        cx="101.925"
        cy="809.008"
        r="1.09"
        gradientTransform="matrix(800 0 0 -799.9985 -81386 648000.75)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#09F"></stop>
        <stop offset="0.61" stopColor="#A033FF"></stop>
        <stop offset="0.935" stopColor="#FF5280"></stop>
        <stop offset="1" stopColor="#FF7061"></stop>
      </radialGradient>
      <path
        fill="url(#Gradient)"
        d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2c.7 22.7 24.1 37.5 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z"
      ></path>
      <path
        fill="#FFF"
        d="M159.8 501.5l117.5-186.4c18.7-29.7 58.7-37 86.8-16l93.5 70.1c8.6 6.4 20.4 6.4 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9c-18.7 29.7-58.7 37-86.8 16l-93.5-70.1c-8.6-6.4-20.4-6.4-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z"
      ></path>
    </svg>
  );
};

export default Bike;
