import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GoBackLink from "./GoBackLink";
const MenuToggle = styled.div`
  position: absolute;
  top: 10px; /* 좌측 상단에 위치하도록 수정 */
  left: 10px; /* 좌측 상단에 위치하도록 수정 */
  z-index: 1;
  user-select: none;
`;
const MenuLink = styled.a`
  text-decoration: none;
  color: #232323;
  transition: color 0.3s ease;

  &:hover {
    color: orangered;
  }
  a {
    transition: color 0.3s ease;

    &:hover {
      color: orangered;
    }
  }
`;

const MenuInput = styled.input`
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: 0px;
  left: -5px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
`;

const MenuSpan = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: ${(props) => props.theme.accentColor};
  border-radius: 3px;
  transform-origin: ${(props) =>
    props.firstChild ? "0% 0%" : props.lastChild ? "0% 100%" : "4px 0px"};
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  z-index: 1;
`;

const Menu = styled.ul`
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  height: 100vh;
  padding: 50px;
  padding-bottom: 3000px;
  padding-top: 125px;
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: ${(props) => (props.isOpen ? "none" : "translate(-100%, 0)")};
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`;

const MenuItem = styled.li`
  padding: 10px 0;
  font-size: 26px;
`;

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuToggle>
      <MenuInput type="checkbox" checked={isOpen} onChange={handleToggle} />
      <MenuSpan firstChild={true}></MenuSpan>
      <MenuSpan></MenuSpan>
      <MenuSpan lastChild={true}></MenuSpan>
      <Menu isOpen={isOpen}>
        <MenuLink>
          <MenuItem>
            <Link to="/home">Home</Link>
          </MenuItem>
        </MenuLink>

        <MenuLink>
          <MenuItem>
            <Link to="/notice">Notice</Link>
          </MenuItem>
        </MenuLink>

        <MenuLink>
          <MenuItem>
            <Link to="/boards">Boards</Link>
          </MenuItem>
        </MenuLink>

        <MenuLink href="https://github.com/poramfe" target="_blank">
          <MenuItem>GitHub</MenuItem>
        </MenuLink>

        <MenuLink>
          <MenuItem>
            <Link to="/">Intro</Link>
          </MenuItem>
        </MenuLink>
      </Menu>
    </MenuToggle>
  );
};

export default BurgerMenu;
