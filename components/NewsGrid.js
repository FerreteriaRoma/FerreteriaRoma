import NewsBox from "./NewsBox";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyleNewsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.6s forwards ease-in-out;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columnas en pantallas medianas */
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columnas en pantallas grandes */
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function NewsGrid({ news }) {
  return (
    <StyleNewsGrid
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {news?.length > 0 &&
        news.map((newsItem) => (
          <NewsBox key={newsItem._id} {...newsItem} />
        ))}
    </StyleNewsGrid>
  );
}
