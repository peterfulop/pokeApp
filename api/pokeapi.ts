export interface Pokemon {
    id: number;
    name: string;
    url: string;
    image: string;
    sprites?: any;
    abilities?: any;
    stats?: any;
}

export const getPokemon = async (limit = 150): Promise<Pokemon[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results.map((pokemon: Pokemon, index: number) => ({
        ...pokemon,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
        }.png`,
    }));
};

export const getPokemonDetail = async (id: string): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
};
