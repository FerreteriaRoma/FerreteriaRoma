import styled from "styled-components";

const StyledDiv = styled.div`
    max-width: 1000px;
    margin: 0 auto; // Centra el div horizontalmente
    padding: 0 20px; // Añade padding a los lados
`;

export default function Center({ children }) {
    return (
        <StyledDiv>{children}</StyledDiv>
    );
}