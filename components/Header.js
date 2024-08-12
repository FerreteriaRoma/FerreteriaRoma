import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyleHeader = styled.header`
    background-color: #000;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyleNav = styled.nav`
    display: flex;
    gap: 15px;
`;

const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
`;

export default function Header() {
    return (
        <StyleHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommers</Logo>
                    <StyleNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart (0)</NavLink>
                    </StyleNav>
                </Wrapper>
            </Center>
        </StyleHeader> 
    );
}