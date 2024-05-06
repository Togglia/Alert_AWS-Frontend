import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledGoBackLink = styled(Link)`
  background-color: #3a16cc;
  position: absolute;
  left: 30px;
  display: block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const GoBackLink = ({ to, children }) => {
  return <StyledGoBackLink to={to}>{children}</StyledGoBackLink>;
};

export default GoBackLink;
