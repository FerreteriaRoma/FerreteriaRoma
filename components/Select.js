const { default: styled } = require("styled-components");

const StyledSelect = styled.select`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: white; /* Fondo blanco */
    color: #6E6E6E;
    appearance: none; /* Elimina el estilo predeterminado del navegador */
    font-size: 14px;
`;

export default function Select(props) {
    return <StyledSelect {...props} />;
}
