import Center from "./Center";
import styled from "styled-components";
import ButtonLink from "./ButtonLink";

const YoutubeSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, #ff0000, #d32f2f);
  padding: 50px 20px;
  color: #fff;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  text-align: center;

  @media screen and (min-width: 768px) {
    padding: 80px 40px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    animation: floating 6s ease-in-out infinite;
  }

  &::before {
    width: 200px;
    height: 200px;
    top: -50px;
    left: -50px;
    animation-delay: 0s;
  }

  &::after {
    width: 300px;
    height: 300px;
    bottom: -100px;
    right: -100px;
    animation-delay: 3s;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const YoutubeTitle = styled.h2`
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const YoutubeDesc = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  color: #f0f0f0;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const YoutubeButton = styled(ButtonLink)`
  background: #fff;
  color: #ff0000;
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.4s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #ffe0e0;
    color: #d32f2f;
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

export default function YoutubeChanel() {
  return (
    <Center>
      <YoutubeSection>
        <YoutubeTitle>¡Visita nuestro Canal de Youtube!</YoutubeTitle>
        <YoutubeDesc>
          En nuestro canal de Youtube encontrarás contenido exclusivo, tutoriales y las últimas noticias sobre nuestros productos.
        </YoutubeDesc>
        <YoutubeButton 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer">
          Ir al canal de Youtube
        </YoutubeButton>
      </YoutubeSection>
    </Center>
  );
}
