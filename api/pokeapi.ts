export interface Pokemon {
    name: string;
    url: string;
}

export const getPokemon = async (limit = 150): Promise<Pokemon[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
};
