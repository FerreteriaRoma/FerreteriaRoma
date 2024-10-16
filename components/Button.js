import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

// Animación de parpadeo suave con un efecto de brillo más pequeño
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.3);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.6);
    transform: scale(1);
  }
`;

// Definiendo un degradé de tonos rojos
const redGradient = 'linear-gradient(135deg, #D32F2F, #F44336, #FF5252)';

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Caveat", cursive;
  font-size: 1.1rem;
  font-weight: 400;
  position: relative;
  color: #fff;
  transition: background 0.3s ease-in-out;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}

  &:hover {
    background: #BA141A; // Rojo más intenso al hacer hover
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);

  }

  ${props => !props.$primary && css `
    background: gray;  
  `}

  // Efecto de parpadeo para todos los botones
  ${props => !props.$gray && css`
    background: ${redGradient}; // Usando el degradé de tonos rojos
    animation: ${pulse} 1.5s infinite ease-in-out;
    animation-play-state: ${props => props.isHover ? 'paused' : 'running'};
  `}

  // Pausar la animación al hacer hover
  &:hover {
    animation-play-state: ;
  }
`;

// Usando motion.button para implementar la animación
export const StyledButton = styled(motion.button)`
  ${ButtonStyle}
`;

export default function Button({ children = "Button", ...rest }) {
  return (
    <StyledButton
      {...rest}
      whileHover={{ scale: 1.05 }}  // Animación de escala suave al hacer hover
      whileTap={{ scale: 0.95 }}    // Pequeño efecto de reducción al hacer clic
      transition={{ duration: 0.5 }}  // Duración de la animación
    >
      {children}
    </StyledButton>
  );
}
