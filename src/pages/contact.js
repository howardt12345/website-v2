import React, { Component } from "react"
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Layout } from '@components';
import { email, location, insta, instalink } from '@config';
import PropTypes from 'prop-types';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Button, Heading, FlexContainer } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  padding-bottom: 50px;
  position: relative;
  width: 80vw;
  flex-direction: column;
`;
const StyledSubtitle = styled.div`
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
  border: 1px solid ${colors.textSecondary};
  border-radius: 4px;
  &:focus {
    border: 3px solid solid ${colors.textPrimary};
  }
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid ${colors.textSecondary};
  border-radius: 4px;
  &:focus {
    border: 3px solid solid ${colors.textPrimary};
  }
  resize: none;
`;
const StyledSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;
const StyledSubmitButton = styled.a`
  ${mixins.bigButton};
  margin-top: 20px;
`;
const StyledInfo = styled.div`
  position: relative;
  width: 40%;
  max-width: 400px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;

class ContactPage extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    body: '',
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { title, subtitle } = this.props.data.contact.edges[0].node.frontmatter;
    return (
      <Layout>
        <Helmet>
          <title>Contact | Howard Tseng</title>
          <link rel="canonical" href="https://howardt12345.com/contact" />
        </Helmet>
        <StyledContainer>
          <Heading>{title}</Heading>
          <StyledSubtitle>{subtitle}</StyledSubtitle>
          <FlexContainer>
            <StyledContactForm>
              <StyledLabel>
                Name
                <StyledInput
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </StyledLabel>
              <StyledLabel>
                Email
                <StyledInput
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </StyledLabel>
              <StyledLabel>
                Subject
                <StyledInput
                  type="text"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                />
              </StyledLabel>              
              <StyledLabel>
                Body
                <StyledTextArea
                  type="text"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleInputChange}
                />
              </StyledLabel>
              <StyledSubmitContainer>
                <StyledSubmitButton type='submit'>
                  Submit
                </StyledSubmitButton>
              </StyledSubmitContainer>
            </StyledContactForm>
            <StyledInfo>

            </StyledInfo>
          </FlexContainer>
        </StyledContainer>
      </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
{
  contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
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