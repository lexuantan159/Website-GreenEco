import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { UsersContext } from '../../context/usersProvider';

const EditUser = () => {
    const { userList } = useContext(UsersContext)
    const [loading, setLoading] = useState([]);
    const [user, setUser] = useState({});
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    console.log(userList);

    const params = useParams();
    useEffect(() => {
        if (userList.length === 0) {
            setLoading(true);
        } else {
            setUser(userList.filter((user) => user.id === params.id)[0]);
            console.log(user);
            setLoading(false);
        }
    });
    return (
        <main className="flex-1 ml-60">
            <div className="flex items-center justify-center z-50">
                <div className="bg-white p-8 w-full mt-10 mx-10 border-2 border-primaryColor rounded-3xl">
                    <h2 className="flex text-xl font-bold mb-4 justify-center">Edit User</h2>
                    {loading ? (
                        <Spinner className="h-12 w-12 mt-10 mx-auto" />
                    ) : (
                        <form>
                            <div className="mb-4">
                                <div className="flex justify-around">
                                    <div className="flex-col mb-10">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Fullname <span className="text-red-900">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter full name"
                                            value={user.fullname}
                                            onChange={e => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col mb-10">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Email <span className="text-red-900">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter email"
                                            value={user.email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-10">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-[320px] h-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter address"
                                            value={user.address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col mb-3">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Phone number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter phone number"
                                            value={user.phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-primaryColor text-blue-gray-900 rounded-md w-32 mx-6"
                                >
                                    Change
                                </button>
                                <Link
                                    to="/dashboard/list-user"
                                    className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
};

export default EditUser;
