import React from 'react';
import PropTypes from 'prop-types';
import {
  IconDribbble,
  IconEmail,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLocation,
  IconNotFound,
  IconPlayStore,
  IconRedbubble,
  IconStar,
  IconLogo,
} from '@components/icons';
import { 
  MdAccountCircle,
  MdPhotoCamera,
  MdFolderOpen,
  MdContactMail,
} from "react-icons/md";


const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'About':
      return <MdAccountCircle />;
    case 'Photography':
      return <MdPhotoCamera />;
    case 'Projects':
      return <MdFolderOpen />;
    case 'Contact':
      return <MdContactMail />;
    case 'Dribbble':
      return <IconDribbble />;
    case 'Email':
      return <IconEmail />;
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
    case 'Logo':
      return <IconLogo />;
    case 'NotFound':
      return <IconNotFound />;
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