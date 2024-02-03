import {Fields, mandatoryHeaders} from "../utils/structures";
import {request} from "playwright";


export function getVisibleFacetsNames(json: Fields) {
    const visibleFacets = json.facets.filter((facet) => facet.multiSelect === true);
    visibleFacets.forEach((facet) => console.log(facet.name));
    return visibleFacets.map((facet) => facet.name);
}