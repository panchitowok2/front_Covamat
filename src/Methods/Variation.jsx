import { GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT } from '../Querys/Querys';
import { useQuery } from '@apollo/client';

export function useGetVariationsByDomainVTVP(domain, varietyType, variationPoint) {
    const { loading: loadingV, error: errorV, data: dataV } = useQuery(GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        variables: { domain: { name: domain }, varietyType: {name: varietyType}, variationPoint: {name: variationPoint} },
        fetchPolicy: "network-only"
    });

    return { loadingV, errorV, dataV };
}