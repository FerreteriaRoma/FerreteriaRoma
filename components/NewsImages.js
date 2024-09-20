import { useState, useEffect } from "react";
import styled from "styled-components";

const ImageCarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 300px; // Puedes ajustar la altura según tus necesidades
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  position: absolute;
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#333" : "#ccc")};
  transition: background-color 0.3s ease;
`;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 9500); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [images]);

  return (
    <ImageCarouselWrapper>
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Imagen ${index + 1}`} isActive={index === currentIndex} />
      ))}
      <DotsWrapper>
        {images.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotsWrapper>
    </ImageCarouselWrapper>
  );
};

export default ImageCarousel;
