import Center from "./Center";
import NewsGrid from "./NewsGrid";
import styled from "styled-components";

const Title = styled.a`
  font-weight: 700;
  font-family: "Indie Flower", cursive;
  font-size: 2rem;
  color: #222;
  text-decoration: none;
  margin: 30px 0 20px;
  margin-top: 15px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: linear-gradient(90deg, #ff005a, #0070f3, #ffba08);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0%;
    }
    50% {
      background-position: 100%;
    }
    100% {
      background-position: 0%;
    }
  }
`;

export default function NewNews({ news, mobileNavActive }) {
    return (
        <Center>
            <Title>Nuevas noticias</Title>
            <NewsGrid news={news} mobileNavActive={mobileNavActive}/>
        </Center>
    )
}