import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { name, surname, phone, id } = el;
  return (
    <tr>
      <td>{surname}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
