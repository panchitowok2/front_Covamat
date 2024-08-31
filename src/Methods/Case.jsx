import { CREATE_CASE, ADD_VARIATIONS_TO_CASE, GET_IS_DATASHEET_INSTANCE_IN_CASE } from '../Querys/Querys';
import { useMutation, useLazyQuery } from '@apollo/client';

export function useCreateCase() {
    const [createCase, { loading: loadingCreateCase, error: errorCreateCase, data: dataCreateCase }] = useMutation(CREATE_CASE);
    //console.log('antes de entrar a createDatasheet')

    const createCaseCall = async (name, dominio, description) => {
        const response = await createCase({
            variables: {
                inputCase: {
                    name: name,
                    domain: { name: dominio },
                    description: description,
                    variety: null
                }
            }
        });
        const newId = response.data.createCase.id;
        return newId;
    };
    
    return { createCaseCall, loadingCreateCase, errorCreateCase, dataCreateCase };
}

// Funcion para añadir variaciones a un caso
export function useAddVariationsToCase() {
    const [addVariations, { loading: loadingAddVariations, error: errorAddVariations, data: dataAddVariations }] = useMutation(ADD_VARIATIONS_TO_CASE);
    //console.log('antes de entrar a createDatasheet')

    const addVariationsCall = async (id, arr) => {
        const response = await addVariations({
            variables: {
                idCase: id,
                datasheet: arr
            }
        });
        const res = response.data.addVariations;
        return res;
    };
    
    return { addVariationsCall, loadingAddVariations, errorAddVariations, dataAddVariations };
}

// Consulta para saber si ya agrego esa variacion al caso
export function useGetIsDatasheetInstanceInCase() {
    const [isDatasheetInstanceInCase, { loading: loadingDInCase, error: errorDInCase, data: dataDInCase }] = useLazyQuery(GET_IS_DATASHEET_INSTANCE_IN_CASE, {
        fetchPolicy: "network-only"
    });
    //console.log('antes de entrar a createDatasheet')

    const DInCaseCall = async (id, datasheet) => {
        console.log('dentro de la llamada DInCaseCall ', id, datasheet)
        await isDatasheetInstanceInCase({
            variables: {
                idCase: id,
                datasheet: datasheet
            }
        });
        //const res = response.data.getIsDatasheetInstanceInCase;
        //return res;
    };
    
    return { DInCaseCall, loadingDInCase, errorDInCase, dataDInCase };
}