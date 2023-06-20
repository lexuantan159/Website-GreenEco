import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { UsersContext } from '../../context/usersProvider';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import * as adminServices from '../../services/adminServices';
import Swal from 'sweetalert2';

const EditUser = () => {
    document.title = 'Cập nhật tài khoản | Dashboard';
    const { userList } = useContext(UsersContext);
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState([]);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const data = {};

    const params = useParams();
    const user = userList.filter((user) => user.id === params.id)[0];
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(0);
    const [role, setRole] = useState('');

    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        if (userList.length === 0) {
            setLoading(true);
        } else {
            setFullName(user.fullname);
            setEmail(user.email);
            setAddress(user.address);
            setPhone(user.phone);
            setRole(user.Role.value);
            setLoading(false);
        }
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có muốn lưu các thay đổi không ?',
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingEdit(true);
                setSubmit(true);
            }
        });
    };

    useEffect(() => {
        const fetchEdit = async () => {
            fullName !== user.fullname && (data.fullname = fullName);
            email !== user.email && (data.email = email);
            address !== user.address && (data.address = address);
            phone !== user.phone && (data.phone = phone);
            role !== user.Role.value && (role === 'Admin' ? (data.roleId = 1) : (data.roleId = 2));
            if (Object.keys(data).length === 0) {
                notify('Không có thay đổi để chỉnh sửa');
                setLoadingEdit(false);
                setSubmit(false);
            } else {
                const editUser = await adminServices.editUser(auth.accessToken, params.id, data);
                console.log(editUser);
                if (editUser.statusCode === 200) {
                    notify(editUser.response.message, 'success');
                    setLoadingEdit(false);
                    setSubmit(false);
                } else {
                    notify(editUser.error.message);
                    setLoadingEdit(false);
                    setSubmit(false);
                }
            }
        };
        if (submit && auth.accessToken !== undefined) {
            fetchEdit();
        }
    }, [submit]);

    return (
        <>
            <ToastContainer />
            <main className="flex-1">
                <div className="flex items-center justify-center z-50">
                    <div className="bg-white py-14 px-8 w-full mt-14 mx-10 border-2 border-primaryColor rounded-3xl">
                        <h2 className="flex text-3xl font-extrabold mb-4 justify-center">Cập nhật tài khoản</h2>
                        {loading ? (
                            <Spinner className="h-12 w-12 mt-10 mx-auto" />
                        ) : (
                            <form onSubmit={handleEdit}>
                                <div className="mb-4">
                                    <div className="flex justify-around">
                                        <div className="flex-col mb-10">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Họ và tên <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Enter họ và tên"
                                                value={fullName || ''}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-col mb-10">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Email <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Nhập email"
                                                value={email || ''}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-around">
                                        <div className="flex-col mb-10">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Địa chỉ
                                            </label>
                                            <textarea
                                                type="text"
                                                className="w-[320px] h-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Nhập địa chỉ"
                                                value={address || ''}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-col mb-3">
                                            <div>
                                                <label className="block text-primaryColor text-sm font-bold mb-2">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                                    placeholder="Enter phone number"
                                                    value={phone || ''}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="mt-6">
                                                <label className="block text-primaryColor text-sm font-bold mb-2">
                                                    Quyền
                                                </label>
                                                <select
                                                    className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="User">User</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-primaryColor text-blue-gray-900 rounded-md w-32 mx-6 hover:bg-light-green-800"
                                    >
                                        {loadingEdit ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner className="h-6 w-6 mr-4" /> <span>Loading....</span>
                                            </div>
                                        ) : (
                                            <span>Thay đổi</span>
                                        )}
                                    </button>
                                    <a
                                        href="/dashboard/list-user"
                                        className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2 text-center hover:bg-gray-400"
                                    >
                                        Trở về
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default EditUser;
