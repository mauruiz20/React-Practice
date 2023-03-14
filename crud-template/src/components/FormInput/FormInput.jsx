import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { messages, patterns } from '../../utilities/constants';

/*
 * Componente FormInput
 * Se utiliza para crear un formulario de entrada de datos.
 * El componente toma varios argumentos como propiedades para personalizar el comportamiento y el aspecto del formulario.
 */
const FormInput = ({
    field,
    label,
    register,
    errors,
    variant = 'standard',
    required = true,
    type = 'text',
    pattern,
    multiline = false,
    rows = 1,
    autoFocus = false,
    inputProps,
    onInput,
}) => {
    /* field: Es el nombre del campo, se utiliza como un identificador.
     *
     * label: Es la etiqueta que se muestra al lado del campo de entrada de datos.
     *
     * register: Es una función de registro que se utiliza para vincular el campo de entrada de datos a una funcionalidad de validación.
     *
     * errors: Es un objeto que contiene los errores de validación para el campo de entrada de datos.
     *
     * variant: Tipo de variante para el campo de entrada ('filled', 'outlined', 'standard'). Por defecto es 'standard'.
     *
     * required: Es una propiedad booleana que indica si el campo es obligatorio o no. Por defecto es true.
     *
     * type: Es el tipo de campo, puede ser 'text','email', 'password', etc. Por defecto es 'text'.
     *
     * pattern: Es una expresión regular para la validación del campo.
     *
     * multiline: una propiedad booleana que indica si el campo es de varias líneas o no. Por defecto es false.
     *
     * rows: Es un número que indica cuantas líneas se mostrarán en caso de ser multiline: true. Por defecto es 1.
     *
     * autoFocus: Es una propiedad booleana que indica si el campo debe tener automáticamente el foco. Por defecto es false.
     *
     * inputProps: Propiedades del input.
     *
     * onInput: Callback a ejecutar en caso de ejecutar onInputHandler.
     */
    return (
        <div>
            <InputLabel htmlFor={field} error={!!errors[field]}>
                {label}:
            </InputLabel>
            <TextField
                {...register(field, {
                    required: required && messages.required,
                    pattern: pattern && {
                        value: patterns[pattern],
                        message: messages[pattern],
                    },
                })}
                className={`form-input`}
                variant={variant}
                type={type}
                autoFocus={autoFocus}
                fullWidth
                name={field}
                size='small'
                color='info'
                multiline={multiline}
                rows={rows}
                autoComplete='off'
                onInput={onInput}
                inputProps={inputProps}
                InputLabelProps={{ shrink: true }}
                error={!!errors[field]}
                helperText={errors[field] ? errors[field].message : ' '}
            />
        </div>
    );
};

export default FormInput;
