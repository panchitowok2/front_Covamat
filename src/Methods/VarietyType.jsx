import { GET_VARIETYTYPES_BY_DOMAIN } from '../Querys/Querys';
import { useQuery } from '@apollo/client';

export function useGetVarietyTypesByDomain(domain) {
    const { loadingVT, errorVT, dataVT } = useQuery(GET_VARIETYTYPES_BY_DOMAIN, {
        variables: { domain: { name: domain } },
        fetchPolicy: "network-only"
    });

    return { loadingVT, errorVT, dataVT };
}