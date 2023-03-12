import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface PeopleTableProps {}

const PeopleTable: React.FC<PeopleTableProps> = () => {
    const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
    const pageSize = 5;
    const dispatch = useDispatch();
    const statePeople = useSelector((store: AppStore) => store.people);
    const stateFavorite = useSelector((store: AppStore) => store.favorites);

    const findPerson = (person: Person) => !!stateFavorite.find((p) => p.id === person.id);
    const filterPerson = (person: Person) => selectedPeople.filter((p) => p.id !== person.id);

    const handleChange = (person: Person) => {
        const filteredPeople = findPerson(person)
            ? filterPerson(person)
            : [...stateFavorite, person];

        dispatch(addFavorite(filteredPeople));

        setSelectedPeople(filteredPeople);
    };
    const columns = [
        {
            field: 'actions',
            headerName: '',
            type: 'actions',
            sortable: false,
            width: 50,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <Checkbox
                        size='small'
                        checked={findPerson(params.row)}
                        onChange={() => handleChange(params.row)}
                    />
                </>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 150,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'category',
            headerName: 'Categories',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'company',
            headerName: 'Company',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'levelOfHappiness',
            headerName: 'Level of Happiness',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
    ];

    useEffect(() => {
        setSelectedPeople(stateFavorite);
    }, [stateFavorite]);

    return (
        <DataGrid
            rows={statePeople}
            columns={columns}
            disableColumnSelector
            disableRowSelectionOnClick
            autoHeight
            initialState={{
                pagination: {
                    paginationModel: { pageSize },
                },
            }}
            pageSizeOptions={[pageSize]}
            getRowId={(row: any) => row.id}
        />
    );
};

export default PeopleTable;
