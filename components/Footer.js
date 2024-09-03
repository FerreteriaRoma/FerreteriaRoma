import styled from "styled-components";
import Center from "./Center";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Importar iconos

const StyledFooter = styled.footer`
  background-color: #111;
  padding: 20px 0;
  color: #fff;
  margin-top: 40px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  svg {
    margin-right: 10px;
    color: #ed1c24;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

const CopyrightText = styled.p`
  font-size: 0.75rem;
  text-align: center;
  color: #aaa;
  margin: 0;
  border-top: 1px solid #333;
  padding-top: 10px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Center>
        <Title>Contacto</Title>
        <ContactInfo>
          <ContactItem>
            <FaWhatsapp size={20} />
            <p>WhatsApp: +57 123 456 7890</p>
          </ContactItem>
          <ContactItem>
            <FaEnvelope size={20} />
            <p>Correo: contacto@example.com</p>
          </ContactItem>
          <ContactItem>
            <FaMapMarkerAlt size={20} />
            <p>Sucursal: Calle Falsa 123, Ciudad, País</p>
          </ContactItem>
        </ContactInfo>
        <CopyrightText>© TODOS LOS DERECHOS RESERVADOS</CopyrightText>
      </Center>
    </StyledFooter>
  );
}
