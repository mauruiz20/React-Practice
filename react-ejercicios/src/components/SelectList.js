import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);
  //console.log(data, error, loading);

  if (!data) return null;
  if (error) {
    return (
      <Message
        msg={`Error ${error.status}: ${error.statusText}`}
        bgColor="#dc3545"
      />
    );
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);
  let options;
  //console.log(data);
  switch (title) {
    case "provincias":
      options = data.provincias;
      break;
    case "departamentos":
      options = data.departamentos;
      break;
    case "localidades":
      options = data.localidades;
      //console.log(data.localidades);
      break;
    default:
      options = null;
  }

  //console.log(options[0].nombre);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">-</option>
        {data &&
          options.map((el) => (
            <option
              key={el.id}
              value={
                title !== "localidades" ? el.nombre : el.localidad_censal.nombre
              }
            >
              {title !== "localidades" ? el.nombre : el.localidad_censal.nombre}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectList;
