import React from "react";
import styled from "styled-components";
import { Link as linkR, NavLink as NavLinkR } from "react-router-dom"; // NavLinkR naam de diya conflict se bachne ke liye
import { MenuRounded, AccountCircle } from "@mui/icons-material"; // Avatar ke liye icon
import LogoImg from "../utils/Images/Logo.png"; // Apni logo file ka sahi path yahan likhein
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

const Nav = styled.div`
background-color: white;  
 height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
border-bottom: 1px solid #e5e7eb; 
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  padding: 0px 24px;
  align-items: center;
  justify-content: space-between;   /* 👈 IMPORTANT CHANGE */
`;

const NavLogo = styled(linkR)`
  width: 100px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 42px;
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
  position: absolute;          /* 👈 important */
  left: 50%;                   
  transform: translateX(-50%); /* 👈 exact center */
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(NavLinkR)`
  display: flex;
  align-items: center;
  color: #555;
  font-weight: 500;
  text-decoration: none;
  padding-bottom: 4px;
  transition: 0.3s ease;

  &:hover {
    color: #1976d2;
  }

  &.active {
    color: #1976d2;
    border-bottom: 2px solid #1976d2;
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 6px;
  gap: 10px;
  color: ${({ theme }) => theme.primary};
`;

const Avatar = styled(AccountCircle)`
  color: ${({ theme }) => theme.primary};
  font-size: 32px;
`;

const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// MobileMenu fix: use $isOpen instead of isOpen
const MobileMenu = styled.div`
  display: flex;
  align-items: start;
  gap: 16px;
  flex-direction: column;
  position: absolute;
  background-color: red;
  color: white;
  list-style: none;
  padding: 12px 40px 24px 40px;
  width: 90%;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  z-index: ${({ $isOpen }) => ($isOpen ? "1000" : "-1")};
`;
const Navbar = ({currentUser}) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false); // Mobile menu toggle ke liye state

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>
        
        <NavLogo to="/">
          <Logo src={LogoImg} alt="Logo" />
          Fittrack
        </NavLogo>

        <NavItems>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/tutorials">Tutorials</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/documentation">documentation</NavLink>
        </NavItems>

        <UserContainer>
         <Avatar src={currentUser?.img}>
  {currentUser?.name && currentUser.name[0]}
</Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>

        {/* Mobile Menu logic */}
        <MobileMenu $isOpen={isOpen}>
  <NavLink to="/" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
  <NavLink to="/workouts" onClick={() => setIsOpen(false)}>Workouts</NavLink>
  <NavLink to="/tutorials" onClick={() => setIsOpen(false)}>Tutorials</NavLink>
  <NavLink to="/blogs" onClick={() => setIsOpen(false)}>Blogs</NavLink>
  <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
  <NavLink to="/documentation" onClick={() => setIsOpen(false)}>documentation</NavLink>
</MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;