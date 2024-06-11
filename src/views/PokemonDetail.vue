<template>
  <div class="pokemon-detail" v-if="pokemon">
    <div class="card">
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="Pokemon Image"/>
      <div class="info">
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
        <p><strong>Types:</strong> 
          <span v-for="type in pokemon.types" :key="type.type.name">
            {{ type.type.name }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'PokemonDetail',
  props: ['name'],
  setup(props) {
    const pokemon = ref(null);

    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
        pokemon.value = response.data;
      } catch (error) {
        console.error('Error fetching pokemon detail:', error);
      }
    };

    onMounted(fetchPokemonDetail);

    return {
      pokemon
    };
  }
};
</script>

<style>
.pokemon-detail {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.card {
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 300px;
  text-align: center;
}
.card img {
  width: 150px;
  height: 150px;
}
.card .info {
  text-align: left;
  margin-top: 10px;
}
.card .info p {
  margin: 5px 0;
}
</style>
