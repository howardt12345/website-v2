import styled from 'styled-components';
import theme from './theme';
import media from './media';
const { colors, fontSizes, fonts } = theme;


const Heading = styled.h1`
  text-align: left;
  color: ${colors.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 96px;
  font-weight: 400;
`;

export default Heading;