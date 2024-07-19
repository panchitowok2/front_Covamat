import { GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN } from '../Querys/Querys';
import { useQuery } from '@apollo/client';

export function useGetVariationPointsByVarietyTypeAndDomain(varietyType, domain) {
    const { loading: loadingVP, error: errorVP, data: dataVP } = useQuery(GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN, {
        variables: { varietyType: {name: varietyType}, domain: { name: domain } },
        fetchPolicy: "network-only"
    });

    return { loadingVP, errorVP, dataVP };
}