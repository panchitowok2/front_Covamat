import { CREATE_DATASHEET_INSTANCE } from '../Querys/Querys';
import { useMutation } from '@apollo/client';

export function useCreateDatasheetInstance() {
    const [createDatasheet, { loading: loadingCreateDatasheet, error: errorCreateDatasheet, data: dataCreateDatasheet }] = useMutation(CREATE_DATASHEET_INSTANCE);
    console.log('antes de entrar a createDatasheet')

    const createDatasheetInstance = (dominio, varietyType, variationPoint, idDatasheet, variation) => {
        createDatasheet({
            variables: {
                datasheetInstance: {
                    domain: { name: dominio },
                    varietyType: { name: varietyType },
                    variationPoint: { name: variationPoint },
                    name: null,
                    idDatasheet,
                    variation
                }
            }
        });
    };
    
    return { createDatasheetInstance, loadingCreateDatasheet, errorCreateDatasheet, dataCreateDatasheet };
}