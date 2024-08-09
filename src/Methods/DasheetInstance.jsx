import { CREATE_DATASHEET_INSTANCE } from '../Querys/Querys';
import { useMutation } from '@apollo/client';

export function useCreateDatasheetInstance() {
    const [createDatasheet, { loading: loadingCreateDatasheet, error: errorCreateDatasheet, data: dataCreateDatasheet }] = useMutation(CREATE_DATASHEET_INSTANCE);
    console.log('antes de entrar a createDatasheet')

    const createDatasheetInstance = async (dominio, varietyType, variationPoint, idDatasheet, variation) => {
        const response = await createDatasheet({
            variables: {
                datasheetInstance: {
                    domain: { name: dominio },
                    varietyType: { name: varietyType },
                    variationPoint: { name: variationPoint },
                    name: null,
                    id_datasheet: idDatasheet,
                    variations: variation
                }
            }
        });
        const newIdDatasheetInstance = response.data.createDatasheetInstance.id;
        return newIdDatasheetInstance;
    };
    
    return { createDatasheetInstance, loadingCreateDatasheet, errorCreateDatasheet, dataCreateDatasheet };
}