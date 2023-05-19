function AboutPage() {
    return (
        <div className="mx-auto py-32">
            <div class="w-full h-full flex justify-center items-center">
                <div className="wrap w-full mx-auto px-5 flex justify-center items-center">
                    <div className="mx-16 text-black text-center">
                        <div className="font-bold text-6xl mb-6">About Us</div>
                        <p className="font-medium text-sm mb-8 leading-7 tracking-tight ">
                            Our website sells eco-friendly products.
                            <br /> We are committed to creating high quality and environmentally friendly products.
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <img src="./asset/img/1.jpg" alt="" />
            </div>

        </div>
    );
}

export default AboutPage;
