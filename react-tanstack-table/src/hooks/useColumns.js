import { useMemo } from 'react';

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: 'Apellidos',
        columns: [
          {
            Header: 'Primer apellido',
            accessor: 'firstSurname',
          },
          {
            Header: 'Segundo apellido',
            accessor: 'lastSurname',
          },
        ],
      },
      {
        Header: 'Nombres',
        accessor: 'name',
      },
      {
        Header: 'Correo',
        accessor: 'email',
      },
      {
        Header: 'Teléfono',
        accessor: 'phone',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  return columns;
}
