// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPokemon, getAllRecords } from '../../utils/api';
// import './pokemon/Pokemon.css';
// import {
//   setPokemonName,
//   setPokemonData,
//   setMoveDetails,
//   setData
// } from '../../redux/features/pokemonSlice';

// const Pokemon = () => {
//   const pokemonName = useSelector((state) => state.pokemon.pokemonName);
//   const pokemonData = useSelector((state) => state.pokemon.pokemonData);
//   const moveDetails = useSelector((state) => state.pokemon.moveDetails);
//   const data = useSelector((state) => state.pokemon.data);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getAllRecords();
//       dispatch(setData(response.data.results));
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleInputChange = (event) => {
//     dispatch(setPokemonName(event.target.value));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (pokemonName.trim() !== '') {
//       const data = await getPokemon(pokemonName.toLowerCase());
//       dispatch(setPokemonData(data));
//       dispatch(setMoveDetails(null));
//       dispatch(setPokemonName(''));
//     }
//   };

//   const handleNameSelect = async (name) => {
//     const data = await getPokemon(name);
//     dispatch(setPokemonData(data));
//     dispatch(setMoveDetails(null));
//   };

//   const fetchMoveDetails = async (moveUrl) => {
//     try {
//       const response = await fetch(moveUrl);
//       const data = await response.json();

      
//       dispatch(setMoveDetails(data));
//     } catch (error) {
//       ('Error fetching move details:', error);
//     }
//   };

//   return (
//     <div className="grid-container">
//       <div className="left-panel">
//         <h3>Category Name</h3>
//         <ul className="category-list">
//           {data.map((item, index) => (
//             <li key={index} onClick={() => handleNameSelect(item.name)}>
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="right-panel">
//         <form onSubmit={handleSubmit}>
//           <input type="text" value={pokemonName} onChange={handleInputChange} />
//           <button type="submit">Search</button>
//         </form>

//         {pokemonData && (
//           <div className="pokemon-card">
//             <h2>{pokemonData.name}</h2>
//             <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
//             <h3>Abilities:</h3>
//             <ul className="pokemon-list">
//               {pokemonData.abilities.map((ability, index) => (
//                 <li key={index}>{ability.ability.name}</li>
//               ))}
//             </ul>
//             <h3>Types:</h3>
//             <ul className="pokemon-list">
//               {pokemonData.types.map((type, index) => (
//                 <li key={index}>{type.type.name}</li>
//               ))}
//             </ul>
//             <h3>Game Indices:</h3>
//             <ul className="pokemon-list">
//               {pokemonData.game_indices.map((gameIndex, index) => (
//                 <li key={index}>
//                   {gameIndex.version.name} - {gameIndex.game_index}
//                 </li>
//               ))}
//             </ul>
//             <h3>Moves:</h3>
//             <ul className="pokemon-list">
//               {pokemonData.moves.map((move, index) => (
//                 <li
//                   key={index}
//                   onClick={() => fetchMoveDetails(move.move.url)}
//                   className="move-item"
//                 >
//                   {move.move.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {moveDetails && (
//           <div className="move-details">
//             <h3>Move Details:</h3>
//             <p>Name: {moveDetails.name}</p>
//             <p>Power: {moveDetails.power}</p>
//             <p>Accuracy: {moveDetails.accuracy}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pokemon;
