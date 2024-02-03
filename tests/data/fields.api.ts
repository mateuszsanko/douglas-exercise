import {Fields} from "../utils/structures";


/**
 * Retrieves the names of visible facets from the provided Fields object.
 *
 * @param {Fields} json - the Fields object containing the facets
 * @return {string[]} an array of names of visible facets
 */
export function getVisibleFacetsNames(json: Fields): string[] {
    const visibleFacets = json.facets.filter((facet) => facet.multiSelect === true);
    return visibleFacets.map((facet) => facet.name);
}


/**
 * Retrieves the highlights from the given JSON object.
 *
 * @param {Fields} json - the JSON object containing facets
 * @return {Array<string>} an array of highlight names
 */
export function getHighlights(json: Fields): Array<string> {
    const highlights = json.facets.filter((facet) => facet.name == "Highlights");
    return highlights[0].values.map((value) => value.name);
}