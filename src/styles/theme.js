import { hex2rgba } from '@utils';


const ACCENT = '#2196F3';
const DARK_BG = '#EAEAEA';
const BG = '#FFFFFF';

const theme = {
  colors: {
    background: BG,
    background_secondary: DARK_BG,
    accent: ACCENT,
    textPrimary: '#000000',
    textSecondary: '#7A7A7A',
    textBody: '#0C0C0C',
    translucent_accent: hex2rgba(ACCENT, 0.07),
    shadow_bg: hex2rgba(DARK_BG, 0.7),
  },

  fonts: {
    Poppins: "Poppins",
    Raleway: "raleway, sans-serif",
  },

  fontSizes: {
    xs: '12px',
    smish: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h3: '32px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '3px',
  navHeight: '86px',
  navScrollHeight: '72px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: 120,
  radius: 3,

  hamburgerWidth: 24,
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

  navDelay: 1000,
  loaderDelay: 2000,
};

export default theme;