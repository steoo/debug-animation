import { useScroll, useSpring } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

import { RoundedBoxContainer, RoundedBoxHeader } from './box.styled';

const AnimatedRoundedBoxHeader = ({
  title,
  color,
  calculatePosition,
  boxRef,
}: {
  title: string;
  color: string;
  calculatePosition?: boolean;
  boxRef?: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const [boxStyles, boxApi] = useSpring(() => ({
    y: '-120%',
  }));

  useScroll({
    container: boxRef as React.MutableRefObject<HTMLDivElement> | undefined,
    default: {
      immediate: true,
    },
    onChange: ({ value: { scrollYProgress } }, ...args) => {
      console.log(scrollYProgress, args);
      if (scrollYProgress > 0.1) {
        boxApi.start({ y: '0%' });
      } else {
        boxApi.start({ y: '-120%' });
      }
    },
  });

  // Ref to store the title element
  const titleRef = useRef<HTMLHeadingElement>(null);
  const boxHeaderRef = useRef<HTMLDivElement | null>(null);

  // State to store the width of the title (defaults to 0)
  const [titleWidth, setTitleWidth] = useState(0);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [hasAnimation, setHasAnimation] = useState(true);

  // Dynamic marquee animation based on the width of the title
  const marqueeAnimation = {
    x: [0, -titleWidth],
  };

  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  // Add event listener for scroll to recalculate positions
  useEffect(() => {
    const recalculatePosition = () => {
      if (boxRef?.current && calculatePosition) {
        const { left, width, top } = boxRef.current.getBoundingClientRect();
        setPosition({ left: left + width / 2, top });
      }
    };

    if (calculatePosition) {
      window.addEventListener('resize', recalculatePosition);

      recalculatePosition();

      return () => {
        window.removeEventListener('resize', recalculatePosition);
      };
    }
  }, [calculatePosition, boxRef]);

  useEffect(() => {
    const rect = boxHeaderRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setHasAnimation(titleWidth > rect.width);
  }, [titleWidth]);

  return (
    <RoundedBoxContainer>
      <RoundedBoxHeader
        ref={boxHeaderRef}
        color={color}
        style={{ overflow: 'hidden', ...boxStyles }} // Hide overflow for scrolling effect
      >
        <div
          style={{
            display: 'flex', // Keep the title elements inline
            whiteSpace: 'nowrap', // Prevent title from wrapping to the next line
          }}
        >
          {hasAnimation && (
            <h3 ref={titleRef} style={{ marginRight: '1px' }}>
              {title}
            </h3>
          )}
          <h3>{title}</h3>
        </div>
      </RoundedBoxHeader>
    </RoundedBoxContainer>
  );
};

export default AnimatedRoundedBoxHeader;
