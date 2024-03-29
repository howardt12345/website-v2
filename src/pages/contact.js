import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Layout } from '@components';
import { email, location, insta, instalink, recaptchaKey } from '@config';
import PropTypes from 'prop-types';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import firebase from 'gatsby-plugin-firebase';
import { theme, mixins, media, Section, Heading, FlexContainer } from '@styles';
import { currentTime, replaceAll } from '@utils';
import Reaptcha from 'reaptcha';

const { fontSizes, fonts } = theme;
const _ = require('lodash');

const StyledContainer = styled(Section)`
  padding-bottom: 50px;
  position: relative;
  width: 80vw;
  flex-direction: column;
`;
const StyledSubtitle = styled.div`
  font-size: ${fontSizes.lg};
  ${media.tablet`font-size: ${fontSizes.md};`};
  text-align: center;
`;
const StyledContactForm = styled.form`
  margin-top: 20px;
  width: 60%;
  max-width: 600px;
  ${media.tablet`width: 100%;`};
`;
const StyledLabel = styled.label`
  font-family: ${fonts.Raleway};
  font-size: ${fontSizes.sm};
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.textSecondary};
  border-radius: 4px;
  &:focus {
    border: 3px solid solid ${({ theme }) => theme.textPrimary};
  }
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 10px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.textSecondary};
  border-radius: 4px;
  &:focus {
    border: 3px solid solid ${({ theme }) => theme.textPrimary};
  }
  resize: none;
`;
const StyledSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  margin-top: 20px;
`;
const StyledSubmitButton = styled.button`
  ${mixins.bigButton};
  margin-top: 20px;
`;
const StyledInfo = styled.div`
  position: relative;
  width: 40%;
  max-width: 400px;
  margin-left: 60px;
  margin-top: 40px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.tablet`width: 100%;`};
  ${media.phablet`width: 80%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledInfoText = styled.a`
  display: flex;
  text-align: left;
  font-family: ${fonts.Poppins};
  font-size: ${fontSizes.md};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0px;
  svg {
    width: 15px;
  }
`;
const StyledIcon = styled.div`
  padding-right: 12px;
  svg {
    width: 15px;
  }
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 14px;
`;

const validate = values => {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.subject) {
    errors.subject = 'Subject is required';
  }
  if (!values.body) {
    errors.body = 'Body is required';
  }
  return errors;
};

const formSubmissions = true;
const recaptcha = false;

class ContactPage extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    body: '',
    verified: false,
  };

  onVerify = recaptchaResponse => {
    this.setState({
      verified: true,
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async event => {
    let errors = validate(this.state);
    if (!_.isEmpty(errors)) {
      alert(
        Object.values(errors)
          .map(v => 'Error: ' + v)
          .join('\n'),
      );
      return;
    }
    event.preventDefault();
    if (formSubmissions) {
      try {
        await firebase
          .auth()
          .signInAnonymously()
          .then(async () => {
            await firebase
              .firestore()
              .collection('messages')
              .add({
                name: this.state.name,
                email: this.state.email,
                subject: this.state.subject,
                body: encodeURIComponent(this.state.body),
                date: currentTime(),
                read: false,
                replied: false,
                archived: false,
              })
              .then(() => {
                alert(`Message has been sent! Thank you ${this.state.name}!`);
                firebase.auth().currentUser.delete();
              })
              .catch(e => {
                alert(`An unexpected error has occured.`);
              });
          })
          .catch(e => {
            alert(`An unexpected error has occured.`);
          });
      } catch (error) {
        alert(`An unexpected error has occured.`);
      }
    } else {
      alert('Form submission is currently disabled. Please try again later.');
    }
    this.setState({
      name: '',
      email: '',
      subject: '',
      body: '',
      verified: false,
    });
    if (recaptcha) this.captcha.reset();
  };

  render() {
    const {
      title,
      subtitle,
    } = this.props.data.contact.edges[0].node.frontmatter;
    return (
      <Layout isHome={false} animateNav={false} footer={true}>
        <Helmet>
          <title>Contact | Howard Tseng</title>
          <link rel="canonical" href="https://howardt12345.com/contact" />
        </Helmet>
        <StyledContainer>
          <Heading>{title}</Heading>
          <StyledSubtitle>{subtitle}</StyledSubtitle>
          <FlexContainer>
            {false && (
              <StyledContactForm onSubmit={this.handleSubmit}>
                <StyledLabel>
                  Name
                  <StyledInput
                    type="text"
                    name="name"
                    value={this.state.name || ''}
                    onChange={this.handleInputChange}
                  />
                </StyledLabel>
                <StyledLabel>
                  Email
                  <StyledInput
                    type="text"
                    name="email"
                    value={this.state.email || ''}
                    onChange={this.handleInputChange}
                  />
                </StyledLabel>
                <StyledLabel>
                  Subject
                  <StyledInput
                    type="text"
                    name="subject"
                    value={this.state.subject || ''}
                    onChange={this.handleInputChange}
                  />
                </StyledLabel>
                <StyledLabel>
                  Body
                  <StyledTextArea
                    type="text"
                    name="body"
                    value={this.state.body || ''}
                    onChange={this.handleInputChange}
                  />
                </StyledLabel>
                <StyledSubmitContainer>
                  {recaptcha && (
                    <Reaptcha
                      ref={e => (this.captcha = e)}
                      sitekey={recaptchaKey}
                      onVerify={this.onVerify}
                    />
                  )}
                  <StyledSubmitButton
                    type="submit"
                    disabled={!this.state.verified && recaptcha}
                  >
                    Submit
                  </StyledSubmitButton>
                </StyledSubmitContainer>
              </StyledContactForm>
            )}
            <StyledInfo>
              <StyledInfoText
                href={`mailto:${email}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <StyledIcon>
                  <FormattedIcon name="Email" />
                </StyledIcon>
                <span>{email}</span>
              </StyledInfoText>
              <StyledInfoText
                href={instalink}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <StyledIcon>
                  <FormattedIcon name="Instagram" />
                </StyledIcon>
                <span>{insta}</span>
              </StyledInfoText>
              <StyledInfoText
                href={`https://google.com/maps/place/${replaceAll(
                  location,
                  ' ',
                  '+',
                )}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <StyledIcon>
                  <FormattedIcon name="Location" />
                </StyledIcon>
                <span>{location}</span>
              </StyledInfoText>
            </StyledInfo>
          </FlexContainer>
        </StyledContainer>
      </Layout>
    );
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
  {
    contact: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/contact/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
  }
`;
