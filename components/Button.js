import styled, { css } from "styled-components";

export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;

    svg {
        height: 16px;
        margin-right: 5px;
    }
    
    ${props => props.$gray && !props.$outline && css`
        background-color: #6D6E71;
        color: #fff;
    `}
    ${props => props.$gray && props.$outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.$primary && css`
        background-color: #ED1C24;
        color: #fff;
        border: 1px solid #6D6E71;
    `}
    ${props => props.$size === 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg {
            height: 20px;
        }
    `}
`;

export const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({ children = "Button", ...rest }) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}
