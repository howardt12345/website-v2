import styled from 'styled-components';
import { theme } from './theme';
import media from './media';
const { fonts } = theme;


const Heading = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${fonts.Poppins};
  font-size: 96px;
  font-weight: 400;
  ${media.bigDesktop`font-size: 96px;`};
  ${media.tablet`font-size: 64px;`};
  ${media.phone`font-size: 52px;`};
`;

export default Heading;