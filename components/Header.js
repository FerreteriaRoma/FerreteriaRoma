import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyleHeader = styled.header`
    background-color: #000;
`;

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
`;

const StyleNav = styled.nav`
    display: flex;
    gap: 15px;
    align-items: center;
`;

const Img = styled.img`
    height: 55px;
`;

const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
    &:hover {
        color: #ED1C24;
    }
`;

export default function Header() {
    return (
        <StyleHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <Img src="/img/fondo.png" alt="Logo"/>
                    </Logo>
                    <StyleNav>
                        <NavLink href={'/'}>Principal</NavLink>
                        <NavLink href={'/products'}>Todos los productos</NavLink>
                        <NavLink href={'/categories'}>Categorías</NavLink>
                        <NavLink href={'/account'}>Cuenta</NavLink>
                        <NavLink href={'/cart'}>Carrito (0)</NavLink>
                    </StyleNav>
                </Wrapper>
            </Center>
        </StyleHeader> 
    );
}
