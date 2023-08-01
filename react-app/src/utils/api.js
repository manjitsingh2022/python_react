import axios from 'axios';
export const getPokemon = async (pokemonName) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  export const getAllRecords = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  };  
