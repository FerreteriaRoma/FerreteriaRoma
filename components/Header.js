import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const StyleHeader = styled.header`
  background-color: #000;
  padding: 10px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const StyleNav = styled.nav`
  display: ${({ mobileNavActive }) => (mobileNavActive ? "block" : "none")};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 100px 20px 20px;
  background-color: #000;
  transition: all 0.3s ease;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    background-color: transparent;
  }
`;

const Img = styled.img`
  height: 60px;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ed1c24;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
            <Img src="/img/fondo.png" alt="Logo" />
          </Logo>
          <StyleNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Principal</NavLink>
            <NavLink href={"/products"}>Todos los productos</NavLink>
            <NavLink href={"/cart"}>Carrito ({cartProducts.length})</NavLink>
          </StyleNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
}
