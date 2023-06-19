import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as adminService from '../../services/adminServices';
import { Spinner } from '@material-tailwind/react';
import { UsersContext } from '../../context/usersProvider';
import AuthContext from '../../context/authProvider';
import Swal from 'sweetalert2';
import vnStr from 'vn-str'

const UserList = () => {
    document.title = 'Danh sách tài khoản | Dashboard';
    const { userList, setUserList } = useContext(UsersContext);
    const [loading, setLoading] = useState([]);
    const { auth } = useContext(AuthContext);
    const [filterUser, setFilterUser] = useState([]);

    const handleChangeSearch = (e) => {
        const searchValue = vnStr.rmVnTones(e.target.value).toLowerCase();
        console.log(searchValue)
        const searchItem =
            searchValue !== ''
                ? userList.filter((item) => vnStr.rmVnTones(item.fullname.toLowerCase()).includes(searchValue))
                : userList;
        setFilterUser(searchItem);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await adminService.getUsers(auth.accessToken);
            if (response.statusCode === 200) {
                setFilterUser(response.users);
                setUserList(response.users);
                setLoading(false);
            } else {
                console.log(response.error);
            }
        };
        if (userList.length === 0 && auth.accessToken !== undefined) {
            fetchUsers();
        }
    }, [userList]);

    const handleDelete = (e) => {
        Swal.fire({
            title: 'Bạn có chắc không ?',
            text: 'Bạn sẽ không thể hoàn nguyên điều này !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có, xóa nó đi !',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                deleteEvent();
            }
        });
        const deleteEvent = async () => {
            const userId = e.target.closest('tr').getAttribute('data-id');
            if (userId === auth.id) {
                Swal.fire('Lỗi !', 'Bạn không được phép xóa tài khoản mà bạn đang đăng nhập.', 'error');
                setLoading(false);
            } else {
                const deleteUser = await adminService.deleteUser(auth.accessToken, userId);
                if (deleteUser.statusCode === 200) {
                    Swal.fire('Thành công !', 'Tài khoản của người dùng này đã được xóa.', 'success').then((result) => {
                        result.isConfirmed && setFilterUser(userList.filter((user) => user.id !== userId));
                        setLoading(false);
                    });
                } else {
                    Swal.fire('Lỗi !', 'Có lỗi khi xóa tài khoản.', 'error');
                    setLoading(false);
                }
            }
        };
    };

    return (
        <>
            <div></div>
            <main className="flex-1">
                <div className="sticky top-0 left-0 right-0 flex items-center justify-between py-5 px-10 border-2 border-gray-200 rounded-b-2xl bg-white">
                    <div>
                        <h1 className="text-xl font-bold leading-relaxed text-gray-800">Danh sách tài khoản</h1>
                        <p className="text-sm font-sm text-gray-500">
                            Đây là danh sách các tài khoản đã đăng ký trên hệ thống
                        </p>
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
                                placeholder="Nhập tên tài khoản..."
                                onChange={handleChangeSearch}
                            />
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Spinner className="h-12 w-12 mt-60 mx-auto" />
                ) : (
                    <table className="w-[90%] m-auto">
                        <thead>
                            <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                                <td className="py-4 px-12 w-[235px] text-lg font-bold text-primaryColor text-center">
                                    Họ và tên
                                </td>
                                <td className="py-4 px-4 text-lg font-bold text-primaryColor text-center">Email</td>
                                <td className="py-4 px-9 w-[350px] text-lg font-bold text-primaryColor text-center">
                                    Địa chỉ
                                </td>
                                <td className="py-4 px-9 text-lg font-bold text-primaryColor text-center">SĐT</td>
                                <td className="py-4 px-9 text-lg font-bold text-primaryColor text-center">Quyền</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filterUser.map((user) => (
                                <tr key={user.id} className="border-2 border-gray-200 text-center" data-id={user.id}>
                                    <td className="inline-block w-[235px] py-4 px-8 truncate text-center text-blue-gray-900 font-extrabold">
                                        {user.fullname}
                                    </td>
                                    <td className="py-1 pr-2 text-center">{user.email}</td>
                                    <td
                                        className={`ml-6 w-[350px] py-1 pr-9 truncate inline-block text-center ${user.phone ||
                                            'text-red-700'}`}
                                    >
                                        {user.address || 'Chưa có địa chỉ'}
                                    </td>
                                    <td className={`py-1 px-8 text-center ${user.phone || 'text-red-700'}`}>
                                        {user.phone || 'Chưa có SĐT'}
                                    </td>
                                    <td className={'py-1 px-8 text-center'}>{user.Role.value}</td>
                                    <td className="py-1 px-8 text-center">
                                        <Link
                                            to={`/dashboard/edit-user/${user.id}`}
                                            className="px-2 text-primaryColor hover:text-light-blue-900"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>
                                        <button
                                            className="px-2 text-primaryColor hover:text-deep-orange-900"
                                            onClick={handleDelete}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </>
    );
};

export default UserList;
