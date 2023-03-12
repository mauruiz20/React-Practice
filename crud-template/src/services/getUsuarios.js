import {useCrud} from '../context/CrudContext';
import {helpHttp} from '../helpers/helpHttp';
import useAlert from '../hooks/useAlert';
import {urlUsuarios} from '../utils/constants';

export const GetUsuarios = async () => {
    const {state, setLoading, handleGetData} = useCrud();
    const {setError} = useAlert();

    let offSet = (state.page - 1) * state.rowCount;

    let endpoint = `${urlUsuarios}?cadena=${state.cadena}&incluyeBajas=${
        state.incluyeBajas ? 'S' : 'N'
    }&orden=${state.orden}&offSet=${offSet}&rowCount=${state.rowCount}`;

    setLoading(true);
    try {
        const db = await helpHttp().get(endpoint);
        handleGetData(db.results, db.numRows, db.numPages);
        setError(null);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
