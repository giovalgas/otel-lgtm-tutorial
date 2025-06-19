import {columns, type User} from "@/features/user/list/columns.tsx";
import {DataTable} from "@/components/data-table.tsx";

async function getData(): Promise<User[]> {
    return [
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
        {
            id: 1,
            firstName: 'Giovani',
            lastName: 'Valgas',
            fullAdress: '88085-260, Fernando Ferreira de Mello, 376',
            birthday: new Date(2024, 2,  27),
        },
    ]
}

async function UsersList() {
    const data = await getData()

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export { UsersList }