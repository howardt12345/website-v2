import React from 'react';
import PropTypes from 'prop-types';
import {
  IconDribbble,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLocation,
  IconPlayStore,
  IconRedbubble,
  IconStar,
} from '@components/icons';

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'Dribbble':
      return <IconDribbble />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Location':
      return <IconLocation />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Redbubble':
      return <IconRedbubble />;
    case 'Star':
      return <IconStar />;
    default:
      return <IconExternal />;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;