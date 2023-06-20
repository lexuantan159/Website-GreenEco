import React, { useContext, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../../context/authProvider';
import { updateUserPassword } from '../../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [hiddenOldPassword, setHiddenOldPassword] = useState(true);
    const [hiddenNewPassword, setHiddenNewPassword] = useState(true);
    const [hiddenReNewPassword, setHiddenReNewPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);

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

    const handleChangePassword = async (event) => {
        event.preventDefault(); // Ngăn chặn trình duyệt tải lại trang
        setLoading(true);
        if (newPassword !== reNewPassword) {
            notify('Mật khẩu Không Khớp', 'error');
        } else {
            const response = await updateUserPassword(auth.accessToken, oldPassword, newPassword);
            if (response.statusCode === 200) {
                setLoading(false);
                notify(response.message, "success");
            } else {
                setLoading(false);
                notify(response.errorMessage, "error");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <form>
                <div className="pb-4 mr-20">
                    <div className="mb-3">
                        <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                            Mật Khẩu Cũ
                        </label>
                        <div className="relative">
                            <input
                                id="input-oldPassword"
                                className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenOldPassword ? 'password' : 'text'}
                                placeholder="Mật Khẩu Cũ"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            {hiddenOldPassword ? (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenOldPassword(!hiddenOldPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEyeSlash}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenOldPassword(!hiddenOldPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEye}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                            Mật Khẩu Mới
                        </label>
                        <div className="relative">
                            <input
                                id="input-newPassword"
                                className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenNewPassword ? 'password' : 'text'}
                                placeholder="Mật Khẩu Mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            {hiddenNewPassword ? (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenNewPassword(!hiddenNewPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEyeSlash}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenNewPassword(!hiddenNewPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEye}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                            Nhập Lại Mật Khẩu Mới
                        </label>
                        <div className="relative">
                            <input
                                id="input-reNewPassword"
                                className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                type={hiddenReNewPassword ? 'password' : 'text'}
                                placeholder="Nhập Lại Mật Khẩu Mới"
                                value={reNewPassword}
                                onChange={(e) => setReNewPassword(e.target.value)}
                                required
                            />
                            {hiddenReNewPassword ? (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenReNewPassword(!hiddenReNewPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEyeSlash}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    onClick={() => setHiddenReNewPassword(!hiddenReNewPassword)}
                                    className="absolute top-4 right-6 hover:cursor-pointer"
                                    icon={faEye}
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            className="border px-4 py-2 rounded-lg bg-primaryColor text-white absolute right-[80px] "
                            type="submit"
                            onClick={handleChangePassword}
                        >
                            {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang lưu...</span>
                                        </div>
                                    ) : (
                                        <span>Lưu</span>
                                    )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ChangePassword;
