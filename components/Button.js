import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;

    svg {
        height: 16px;
        margin-right: 5px;
    }
    
    ${props => props.$gray && !props.$outline && css`
        background-color: #6D6E71;
        color: #fff;
        ;

        &:hover {
            background-color: #BA141A;
            box-shadow: 0 0 0 2px #fff;
        }
    `}
    ${props => props.$gray && props.$outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;

        &:hover {
            background-color: #BA141A;
            box-shadow: 0 0 0 2px #fff;
        }
    `}
    ${props => props.$primary && !props.$outline && css`
        background-color: ${primary};
        color: #fff;
        border: 1px solid #6D6E71;

        &:hover {
            background-color: #BA141A;
            box-shadow: 0 0 0 2px #fff;
        }
    `}
    ${props => props.$primary && props.$outline && css`
        background-color: transparent;
        color: ${primary};
        border: 1px solid ${primary};

        &:hover {
            color: #BA141A;
            box-shadow: 0 0 0 2px ${primary};
        }
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
