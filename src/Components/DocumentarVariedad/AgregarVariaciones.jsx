import React, { useState } from 'react';
import { ADD_VARIATIONS } from '../../Querys/Querys.jsx';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

function AgregarVariaciones({ datasheet }) {

    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm();
    const [agregarVariaciones, { loading: loadingAddVariations, error: errorAddVariations, data: dataAddVariations }] = useMutation(ADD_VARIATIONS);
    const [variationsArray, setVariationsArray] = useState([])

    const inputVariacion1 = watch("inputVariacion1"); // Obtener el valor del input 
    const inputVariacion2 = watch("inputVariacion2"); // Obtener el valor del input 
    const inputVariacion3 = watch("inputVariacion3"); // Obtener el valor del input 
    const inputVariacion4 = watch("inputVariacion4"); // Obtener el valor del input 
    const inputVariacion5 = watch("inputVariacion5"); // Obtener el valor del input 

    //llamar a la mutacion que agrega las variaciones al datasheet
    const onSubmit = async () => {
        // Crear un arreglo con los valores de inputVariacion
        const inputVariaciones = [inputVariacion1, inputVariacion2, inputVariacion3, inputVariacion4, inputVariacion5];

        // Filtrar los valores que no están vacíos y crear un nuevo arreglo de variaciones
        const variations = inputVariaciones.filter(inputVariacion => inputVariacion !== '').map(name => ({ name }));

        console.log('Arreglo variations: ', variations)
        
        agregarVariaciones({
            variables: {
                idDatasheet: datasheet,
                variations
            }
        })
        
    };

    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3'>
                    <h5 className='card-header'>
                        Seleccione un datasheet para agregar variaciones:
                    </h5>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <label>Ingresar variaciones:</label>
                        <div class="form-floating">
                            <input type="variacion1" className="form-control" {...register("inputVariacion1", { required: true, maxLength: 50 })} id="floatingInput" placeholder="variacion1" />
                            <label for="floatingInput">Variación</label>
                        </div>
                        <div class="form-floating mt-2">
                            <input type="variacion1" className="form-control" {...register("inputVariacion2", { required: false, maxLength: 50 })} id="floatingInput" placeholder="variacion2" />
                            <label for="floatingInput">Variación</label>
                        </div>
                        <div class="form-floating mt-2">
                            <input type="variacion1" className="form-control" {...register("inputVariacion3", { required: false, maxLength: 50 })} id="floatingInput" placeholder="variacion3" />
                            <label for="floatingInput">Variación</label>
                        </div>
                        <div class="form-floating mt-2">
                            <input type="variacion1" className="form-control" {...register("inputVariacion4", { required: false, maxLength: 50 })} id="floatingInput" placeholder="variacion4" />
                            <label for="floatingInput">Variación</label>
                        </div>
                        <div class="form-floating mt-2">
                            <input type="variacion1" className="form-control" {...register("inputVariacion5", { required: false, maxLength: 50 })} id="floatingInput" placeholder="variacion5" />
                            <label for="floatingInput">Variación</label>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button type="button submit" className="btn btn-success" >Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default AgregarVariaciones;
