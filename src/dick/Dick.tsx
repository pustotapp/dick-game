import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

type Area = 'head' | 'stem'

const hasSequence = (sequence: Area[], target: Area[]) => {
  let fromIndex = 0;
  for (const element of sequence) {
    const index = target.indexOf(element, fromIndex);
    if (index === -1) {
      return false;
    }
    fromIndex = index;
  }
  return true;
};

const Head = ({
  onMove,
  onStart,
  onEnd
}: any) => {
  const [color, setColor] = useState('#EC5569FF');

  return (
    <path
      d="M 62.603 23.872 l 7.273 20.268 c 1.073 2.989 4.366 4.543 7.355 3.47 l 0.828 -0.297 c 8.586 -3.081 13.049 -12.54 9.968 -21.126 l 0 0 c -3.081 -8.586 -12.54 -13.049 -21.126 -9.968 l -0.828 0.297 C 63.084 17.589 61.531 20.883 62.603 23.872 z"
      style={{
        stroke: 'none',
        strokeWidth: 1,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: color,
        fillRule: 'nonzero',
        opacity: 1
      }}
      transform="matrix(1 0 0 1 0 0) "
      strokeLinecap="round"
      onClick={() => setColor('#EC556999')}
      onMouseMove={onMove}
      onMouseDown={onStart}
      onMouseUp={onEnd}
    />);
};

const Stem = ({
  onMove,
  onStart,
  onEnd
}: any) => {
  const [color, /*setColor*/] = useState('#FFA17AFF');

  return (
    <path
      d="M 70.662 45.615 l -3.165 -8.105 l -4.894 -13.638 C 42.209 33.445 28.504 34.198 1 34.198 v 38.131 c 3.025 1.538 6.437 2.423 10.063 2.423 c 10.506 0 19.311 -7.28 21.647 -17.07 l 0.01 -0.011 C 47.823 56.223 60.469 52.502 70.662 45.615 z"
      style={{
        stroke: 'none',
        strokeWidth: 1,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: color,
        fillRule: 'nonzero',
        opacity: 1
      }}
      transform=" matrix(1 0 0 1 0 0) "
      strokeLinecap="round"
      onMouseMove={onMove}
      onMouseDownCapture={onStart}
      onMouseUpCapture={onEnd}
    />
  );
};

const frictionSeq: Area[] = ['head', 'stem', 'head', 'stem', 'head', 'stem'];

const SpringOut = ({ children }: any) => {
  const props = useSpring({
    opacity: 0.1,
    y: 25,
    from: { opacity: 1, y: 125 },
    config: { mass: 0.1, tension: 25, friction: 100 }
  });
  return <animated.div style={{ ...props, position: 'absolute', top: 0, left: 260 }}>{children}</animated.div>;
};

const Reward = () => {
  return (
    <SpringOut>
      <div>+1 $CUM</div>
    </SpringOut>
  );
};

export const Dick = (/*props: any*/) => {
  // const [isReady, setIsReady] = useState(true);
  const [frictions, setFrictions] = useState<Area[]>([]);
  const [currentFrictionArea, setCurrentFrictionArea] = useState<Area | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [shouldShowReward, showReward] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => showReward(false), 5000);

    return () => clearInterval(interval);
  }, [shouldShowReward]);

  const handleAreaChange = (targetArea: Area) => () => {
    if (isStarted && currentFrictionArea !== targetArea) {
      setCurrentFrictionArea(targetArea);
      if (currentFrictionArea) {
        setFrictions([...frictions, currentFrictionArea]);
        if (hasSequence(frictionSeq, frictions)) {
          setCurrentFrictionArea(null);
          setIsStarted(false);
          setFrictions([]);
          showReward(true);
        }
      }
    }
  };

  return <div>
    <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" version="1.1" width="256"
      height="256" viewBox="0 0 256 256" xmlSpace="preserve">

      <defs>
      </defs>
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <Head
          onEnd={() => setIsStarted(false)}
          onMove={handleAreaChange('head')}
          onStart={() => setIsStarted(true)}
        />
        <Stem
          onEnd={() => setIsStarted(false)}
          onMove={handleAreaChange('stem')}
          onStart={() => setIsStarted(true)}
        />
        <path
          d="M 75.296 48.949 c -2.771 0 -5.373 -1.718 -6.361 -4.471 L 61.662 24.21 c 0 0 0 0 0 0 c -1.257 -3.504 0.571 -7.377 4.074 -8.634 l 0.828 -0.297 c 9.089 -3.262 19.142 1.479 22.405 10.571 c 3.263 9.092 -1.48 19.143 -10.571 22.405 l -0.829 0.298 C 76.819 48.821 76.051 48.949 75.296 48.949 z M 63.544 23.534 l 7.274 20.268 c 0.884 2.466 3.607 3.751 6.075 2.867 l 0.829 -0.298 c 3.902 -1.4 7.024 -4.235 8.792 -7.984 s 1.972 -7.962 0.571 -11.863 c -1.399 -3.902 -4.236 -7.024 -7.984 -8.793 c -3.749 -1.769 -7.962 -1.972 -11.863 -0.571 l -0.828 0.297 C 63.946 18.343 62.66 21.069 63.544 23.534 L 63.544 23.534 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: '#000',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path
          d="M 80.739 29.803 c -0.41 0 -0.795 -0.254 -0.941 -0.663 c -0.187 -0.52 0.084 -1.093 0.604 -1.279 l 7.288 -2.616 c 0.516 -0.188 1.093 0.083 1.279 0.604 c 0.187 0.52 -0.084 1.093 -0.604 1.279 l -7.288 2.616 C 80.966 29.784 80.852 29.803 80.739 29.803 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: '#000',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path
          d="M 11.063 75.752 c -3.673 0 -7.212 -0.852 -10.516 -2.532 C 0.211 73.049 0 72.704 0 72.328 v -38.13 c 0 -0.552 0.448 -1 1 -1 c 27.985 0 41.354 -0.925 61.178 -10.231 c 0.503 -0.235 1.096 -0.019 1.33 0.48 c 0.234 0.5 0.02 1.095 -0.48 1.33 C 43.075 34.143 29.624 35.175 2 35.198 v 36.508 c 2.863 1.358 5.909 2.047 9.063 2.047 c 9.882 0 18.384 -6.703 20.675 -16.302 c 0.128 -0.537 0.674 -0.867 1.205 -0.74 c 0.538 0.128 0.869 0.668 0.741 1.205 C 31.176 68.417 21.875 75.752 11.063 75.752 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: '#000',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        <path
          d="M 24.031 59.259 c -0.534 0 -0.978 -0.422 -0.999 -0.961 c -0.022 -0.552 0.408 -1.017 0.96 -1.038 c 19.753 -0.775 34.836 -4.856 46.11 -12.474 c 0.456 -0.309 1.08 -0.188 1.388 0.269 c 0.31 0.458 0.189 1.08 -0.269 1.388 C 59.63 54.276 44.207 58.467 24.071 59.258 C 24.058 59.259 24.044 59.259 24.031 59.259 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: '#000',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
      </g>
    </svg>
    {shouldShowReward && <Reward />}
  </div>;
};
