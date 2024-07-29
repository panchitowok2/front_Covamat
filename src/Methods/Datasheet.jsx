import { useQuery } from "@apollo/client";
import { GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT } from "../Querys/Querys";

export function useGetIdDatasheetByDomainVTVP(domain, vt, vp) {
    const { loading: loadingId, error: errorId, data: dataId } = useQuery(GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        variables: {
            domain: { name: domain },
            varietyType: { name: vt },
            variationPoint: { name: vp }
        },
        fetchPolicy: "network-only"
    });

    return { loadingId, errorId, dataId };
}