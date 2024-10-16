import styled from "styled-components";
import Center from "./Center";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Estilos para el footer
const StyledFooter = styled.footer`
  background-color: #111;
  padding: 40px 0;
  color: #fff;
  margin-top: 40px;
`;

// Título de la sección de contacto
const Title = styled.h2`
  font-size: 2.2rem;
  font-family: "Indie Flower", cursive;
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
`;

// Contenedor de información de contacto
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px; // Más espacio debajo del contacto

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// Estilos para cada elemento de contacto
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

  svg {
    margin-right: 12px;
    color: #ed1c24; // Color rojo para los iconos
    font-size: 24px; // Aumentar el tamaño del icono
  }

  p {
    margin: 0;
    font-size: 1rem; // Aumentar el tamaño del texto
  }

  // En pantallas más grandes, alinear cada item en columnas
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Estilos para el texto de derechos de autor
const CopyrightText = styled.p`
  font-size: 0.8rem;
  text-align: center;
  color: #aaa;
  margin: 0;
  border-top: 1px solid #333;
  padding-top: 20px;
`;

const Desc = styled.p`
  font-size: 1.5rem;
  font-family: "Indie Flower", cursive;
`;

// Componente del footer
export default function Footer() {
  return (
    <StyledFooter>
      <Center>
        <Title>Contacto</Title>
        <ContactInfo>
          {/* Información de contacto por WhatsApp */}
          <ContactItem>
            <FaWhatsapp />
            <div>
              <Desc>WhatsApp: +57 3162323422</Desc>
              <Desc>WhatsApp: +57 3245879698</Desc>
              <Desc>WhatsApp: +57 3243320145</Desc>
            </div>
          </ContactItem>

          {/* Información de contacto por Correo */}
          <ContactItem>
            <FaEnvelope />
            <Desc>Correo: ferreteriaydustribuidoraroma@gmail.com</Desc>
          </ContactItem>

          {/* Información de las sucursales */}
          <ContactItem>
            <FaMapMarkerAlt />
            <div>
              <Desc>Sucursal: Cra 80 56 - 31s Class Roma</Desc>
              <Desc>Sucursal: Cra 69 B No. 37B - 11 Sur</Desc>
              <Desc>Sucursal: Calle 3 No. 9 - 03</Desc>
            </div>
          </ContactItem>
        </ContactInfo>

        <CopyrightText>© TODOS LOS DERECHOS RESERVADOS</CopyrightText>
      </Center>
    </StyledFooter>
  );
}
