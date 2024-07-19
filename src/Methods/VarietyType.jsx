import { GET_VARIETYTYPES_BY_DOMAIN } from '../Querys/Querys';
import { useQuery } from '@apollo/client';

export function useGetVarietyTypesByDomain(domain) {
    const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETYTYPES_BY_DOMAIN, {
        variables: { domain: { name: domain } },
        fetchPolicy: "network-only"
    });

    return { loadingVT, errorVT, dataVT };
}