export const MANDATORY_HEADERS = {
    "accept-language": "de",
    "content-type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive"
}

export interface FacetWithValues {
    facetName: string;
    facetValues: string[];
}

export type Criteria = Sale | Neu | Limitiert;

export interface Highlights {
    produktart: string;
    furWen: string
}
export interface Sale extends Highlights {
    marke: string;
}

export interface Neu extends Highlights {

}

export interface Limitiert {
    marke: string;
    geschenkfur: string;
}

export interface Fields {
    freeTextSearch: string;
    categoryCode: string;
    products: Products[];
    sorts: Sorts[];
    pagination: Pagination;
    currentQuery: CurrentQuery;
    breadcrumbs: any[];
    facets: Facets[];
    defType: string;
    subCategories: any[];
    categoryName: string;
    criteoData: CriteoData;
}

export interface ProductsStock {
    stockLevelStatus: string;
}

export interface ProductsPrice {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    originalValue: number;
    formattedOriginalValue: string;
    discountPercentage: number;
}

export interface ProductsImages {
    url: string;
}

export interface ProductsClassifications {
    name: string;
}

export interface ProductsVariantOptionsPriceData {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
    originalValue: number;
    formattedOriginalValue: string;
    discountPercentage: number;
}

export interface ProductsVariantOptionsBaseContentPrice {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
}

export interface ProductsVariantOptions {
    code: string;
    url: string;
    priceData: ProductsVariantOptionsPriceData;
    baseContentPrice: ProductsVariantOptionsBaseContentPrice;
    numberContentUnits: number;
    baseNumberContentUnits: number;
    contentUnitOfBaseNumberContentUnits: string;
    contentUnit: string;
    marketplaceVendorName: string;
    marketplaceProduct: boolean;
    fulfilledByDouglas: boolean;
    backfill: boolean;
    isMedicine: boolean;
}

export interface ProductsPriceRange {

}

export interface ProductsBaseContentPrice {
    currencyIso: string;
    value: number;
    priceType: string;
    formattedValue: string;
}

export interface ProductsFlags {
    code: string;
}

export interface ProductsProductFamily {
    code: string;
    name: string;
}

export interface ProductsBrand {
    code: string;
    name: string;
}

export interface ProductsBrandLine {
    name: string;
}

export interface Products {
    code: string;
    name: string;
    url: string;
    description: string;
    stock: ProductsStock;
    averageRating: number;
    numberOfReviews: number;
    price: ProductsPrice;
    baseProduct: string;
    images: ProductsImages[];
    classifications: ProductsClassifications[];
    variantOptions: ProductsVariantOptions[];
    volumePricesFlag: boolean;
    priceRange: ProductsPriceRange;
    configuratorType: string;
    configurable: boolean;
    baseContentPrice: ProductsBaseContentPrice;
    numberContentUnits: number;
    baseNumberContentUnits: number;
    contentUnitOfBaseNumberContentUnits: string;
    contentUnit: string;
    flags: ProductsFlags[];
    baseProductUrl: string;
    ratingStars: number;
    productType: string;
    marketplaceProduct: boolean;
    productFamily: ProductsProductFamily;
    defaultDiscountColor: boolean;
    brand: ProductsBrand;
    brandLine: ProductsBrandLine;
    masterAvailability: boolean;
    pdpAccessible: boolean;
}

export interface Sorts {
    code: string;
    name: string;
    selected: boolean;
}

export interface Pagination {
    pageSize: number;
    currentPage: number;
    sort: string;
    totalPages: number;
    totalResults: number;
}

export interface CurrentQueryQuery {
    value: string;
}

export interface CurrentQuery {
    url: string;
    query: CurrentQueryQuery;
}

export interface FacetsValuesQueryQuery {
    value: string;
}

export interface FacetsValuesQuery {
    url: string;
    query: FacetsValuesQueryQuery;
}

export interface FacetsValues {
    name: string;
    count: number;
    query: FacetsValuesQuery;
    selected: boolean;
    code: string;
    contentPageFacetValue: boolean;
    notClickableInFacetTree: boolean;
}

export interface Facets {
    name: string;
    priority: number;
    category: boolean;
    multiSelect: boolean;
    visible: boolean;
    topValues: any[];
    values: FacetsValues[];
    code: string;
}

export interface CriteoDataPlacementProducts {

}

export interface CriteoData {
    placements: any[];
    placementProducts: CriteoDataPlacementProducts;
    isSSR: boolean;
}