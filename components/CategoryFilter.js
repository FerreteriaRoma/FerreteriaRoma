import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; // Importar styled-components

// Estilos para el contenedor del filtro
const FilterContainer = styled.div`
  margin: 20px 0; // Espacio alrededor del filtro
  display: flex; // Usar flexbox para centrar y alinear
  justify-content: center; // Centrar horizontalmente
`;

// Estilos para el select
const StyledSelect = styled.select`
  padding: 3px 20px; // Relleno interno
  text-align: center;
  font-size: 15px; // Tamaño de la fuente
  border: 2px solid #ccc; // Borde gris claro
  border-radius: 5px; // Esquinas redondeadas
  background-color: #eaeaea; // Fondo gris suave
  color: #333; // Color de texto gris oscuro
  width: 700px; // Ancho del select
  appearance: none; // Eliminar el estilo predeterminado del select
  cursor: pointer; // Cambiar el cursor al pasar sobre él
  transition: all 0.3s ease; // Transición suave para el hover

  &:hover {
    border-color: #aaa; // Cambiar el color del borde al pasar el mouse
  }

  &:focus {
    outline: none; // Eliminar el contorno por defecto
    border-color: #888; // Cambiar el color del borde al hacer foco
  }
`;

export default function CategoryFilter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      
      // Nueva parte: Cargar todos los productos al montar el componente
      onCategoryChange(''); // Esto activará la carga inicial
    });
  }, []); // Asegúrate de que este efecto solo se ejecute una vez

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <FilterContainer>
      <StyledSelect 
        value={selectedCategory} 
        onChange={handleCategoryChange}
      >
        <option value="" disabled>Buscar por categoria</option> {/* Cambio importante aquí */}
        <option value="">Todas las Categorías</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </StyledSelect>
    </FilterContainer>
  );
}
