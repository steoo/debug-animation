import { animated } from '@react-spring/web';
import styled from 'styled-components';

const roundValueToDec = (value: number, dec = 4): number => {
  return parseFloat(value.toFixed(dec));
};

export const generateClampSizes = (
  minSize: number,
  maxSize: number,
  minRes = 370,
  maxRes = 1240,
  convertToRem = true
): string => {
  const v = (100 * (maxSize - minSize)) / (maxRes - minRes);
  const r = (minRes * maxSize - maxRes * minSize) / (minRes - maxRes);

  let minSizeRem, maxSizeRem;

  if (convertToRem) {
    minSizeRem = roundValueToDec(minSize / 16);
    maxSizeRem = roundValueToDec(maxSize / 16);
  }

  const rInRem = roundValueToDec(r / 16);
  const roundedV = roundValueToDec(v);

  return `clamp(${minSizeRem}rem, ${roundedV}vw + ${rInRem}rem, ${maxSizeRem}rem)`;
};

const FlexSpaceBetween = styled.div`

  display: flex;
`;

export const Box = styled.div<{ $gridSpan?: number; color?: string }>`
  background-color: ${(props) =>
    props.color ? props.theme[props.color] : 'transparent'};

  border: ${(props) => props.theme.borderWidth}px solid black;
  border-radius: 50px;

  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  padding: ${generateClampSizes(14, 16)} ${generateClampSizes(26, 42)};

  position: relative;

  h3 {
    font-size: ${generateClampSizes(24, 30)};
  }
`;

export const GridBox = styled(Box)`
  @media (min-width: ${(props) => props.theme.laptop}) {
    grid-column: span ${({ $gridSpan }) => $gridSpan || 1};
  }
`;

export const StandaloneBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${generateClampSizes(20, 24)} 0;

  width: 100%;
  padding-top: ${generateClampSizes(46, 70)};
`;

export const BoxHeader = styled(FlexSpaceBetween)`
  position: sticky;
  top: 0;

  align-items: start;

  flex-wrap: wrap;

  h3 {
    text-transform: uppercase;
  }
`;

export const RoundedBoxContainer = styled.div`
  position: absolute;
  left: 50%;
  z-index: 2;

  transform: translate(-50%, -30%);
  overflow: hidden;
`;

export const RoundedBoxHeader = styled(animated.div)<{
  color?: string;
}>`
  background-color: black;
  border: 2px solid
    ${(props) => (props.color ? props.theme[props.color] : 'transparent')};
  border-radius: 50px;

  color: ${(props) => (props.color ? props.theme[props.color] : 'transparent')};
  text-align: center;
  text-transform: uppercase;

  padding: ${generateClampSizes(4, 8)} ${generateClampSizes(8, 16)};

  max-width: ${generateClampSizes(180, 450)};

  h3 {
    font-size: ${generateClampSizes(14, 20)};
    text-wrap: nowrap;
  }
`;
