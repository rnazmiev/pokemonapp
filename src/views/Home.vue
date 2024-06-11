<template>
  <div class="home">
    <h1>Pokemon List</h1>
    <div class="pokemon-list">
      <div 
        class="pokemon-card" 
        v-for="pokemon in pokemons" 
        :key="pokemon.name" 
        @click="goToDetail(pokemon.name)"
      >
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.sprites.front_default" alt="Pokemon Image"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'PokemonHome',
  setup() {
    const pokemons = ref([]);
    const router = useRouter();

    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return { name: pokemon.name, sprites: pokemonDetail.data.sprites };
        });
        pokemons.value = await Promise.all(pokemonDetailsPromises);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    };

    const goToDetail = (name) => {
      router.push({ name: 'PokemonDetail', params: { name } });
    };

    onMounted(fetchPokemons);

    return {
      pokemons,
      goToDetail
    };
  }
};
</script>

<style>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.pokemon-card {
  border: 1px solid #ccc;
  padding: 10px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}
.pokemon-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.pokemon-card img {
  width: 100px;
  height: 100px;
}
</style>
