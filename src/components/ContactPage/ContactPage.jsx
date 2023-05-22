import React, { useState } from 'react';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Thực hiện xử lý khi gửi form
        console.log(name, email, message);
    };

    return (
        <section className="mt-4">
            <div className="container mx-auto min-h-[800px] mb-16">
                <div className="h-[530px] bg-[url('./img/BG_1.jpg')] bg-cover bg-no-repeat bg-bottom mb-20">
                    <div className="w-full h-full flex justify-center items-end bg-green-500 bg-opacity-30">
                        <div className="mx-16 text-white text-center mb-8">
                            <div className="uppercase mb-6 ">Friendly products with the environment</div>
                            <div className="font-bold text-5xl mb-6">Green Eco</div>
                            <div className="font-medium text-lg mb-8">Protect the environment, protect our future.</div>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto w-[800px]"
                >
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Họ và tên của bạn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            placeholder="Nội dung tin nhắn"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className=" flex items-center justify-center ">
                        <button
                            className="bg-[#7fad39] hover:bg-[#7dc413] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
