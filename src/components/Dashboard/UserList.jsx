import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as adminService from '../../services/adminServices';
import { Spinner } from '@material-tailwind/react';
import { UsersContext } from '../../context/usersProvider';
import AuthContext from '../../context/authProvider';

const UserList = () => {
    const { setUserList } = useContext(UsersContext)
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);
    const {auth} = useContext(AuthContext)
    const [filterUser, setFilterUser] = useState([]);
    const navigate = useNavigate();

    if (auth.accessToken && auth.role === 'User') {
        navigate('/');
    }
    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;
        const searchItem =
            searchValue !== '' ? users.filter((item) => item.fullname.toLowerCase().includes(searchValue)) : users;
        setFilterUser(searchItem);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await adminService.getUsers(auth.accessToken);
            if (response.statusCode === 200) {
                setUsers(response.users);
                setFilterUser(response.users);
                setUserList(response.users)
                setLoading(false)
            } else {
                console.log(response.error);
            }
        };
        if (users.length === 0 && auth.accessToken !== undefined) {
            fetchUsers();
        }
    }, []);
    return (
        <main className="flex-1 ml-60">
            <div className="sticky top-0 left-0 right-0 flex items-center justify-between py-5 px-10 border-2 border-gray-200 rounded-b-2xl bg-white">
                <div>
                    <h1 className="text-xl font-bold leading-relaxed text-gray-800">List of Users</h1>
                    <p className="text-sm font-sm text-gray-500">This is the list of registered users on the system</p>
                </div>
                <div className="flex items-center p-2 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                    <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 opacity-30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            className="w-full bg-gray-100 outline-none"
                            type="text"
                            placeholder="Article name or keyword..."
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
            </div>
            {loading ? (
                <Spinner className="h-12 w-12 mt-60 mx-auto" />
            ) : (
                <table className="w-full">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                        <td className="py-4 px-12 text-lg font-bold text-primaryColor text-center">Full name</td>
                        <td className="py-4 px-4 text-lg font-bold text-primaryColor text-center">Email</td>
                        <td className="py-4 px-8 text-lg font-bold text-primaryColor text-center">Address</td>
                        <td className="py-4 px-9 text-lg font-bold text-primaryColor text-center">Phone</td>
                    </tr>
                </thead>
                <tbody>
                    {filterUser.map((user) => (
                        <tr key={user.id} className="border-2 border-gray-200">
                            <td className="inline-block w-[235px] py-4 px-8 truncate text-center text-blue-gray-900 font-extrabold">
                                {user.fullname}
                            </td>
                            <td className="py-4 pr-2 text-center">{user.email}</td>
                            <td
                                className={`ml-6 w-[500px] py-4 pr-8 truncate inline-block text-center ${user.phone ||
                                    'text-red-700'}`}
                            >
                                {user.address || 'No address'}
                            </td>
                            <td className={`py-4 px-8 text-center ${user.phone || 'text-red-700'}`}>
                                {user.phone || 'No phone'}
                            </td>
                            <td className="py-4 px-8 text-center">
                                <Link
                                    to={`/dashboard/edit-user/${user.id}`}
                                    className="px-2 text-primaryColor"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Link>
                                <button className="px-2 text-primaryColor">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) }
            
        </main>
    );
};

export default UserList;
