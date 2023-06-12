import React, { useContext, useState } from 'react';
import ProductsContext from '../../../context/productsProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [searched, setSearched] = useState(false);
    const [productSearched, setProductSearched] = useState([]);
    const { productsList } = useContext(ProductsContext);

    const handleSearch = (e) => {
        e.preventDefault();
        const productSelected = productsList.filter((product) => {
            return product.title.toLowerCase().includes(searchText.toLowerCase());
        });
        setProductSearched(productSelected || []);
        setSearched(true);
        setSearchText("");
    };

    const handleOutsideClick = () => {
      setSearched(false);
  };

    return (
        <div className="mb-7" onClick={handleOutsideClick}>
            <form className="w-[450px] mx-auto relative" onSubmit={(e) => handleSearch(e)}>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-textColor border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-primaryColor "
                        placeholder="Search Products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-primaryColor hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Search
                    </button>
                </div>
                <div
                    className={
                        searched
                            ? `absolute block top-14 right-0 left-0 bg-white shadow z-10 rounded`
                            : `absolute top-14 right-0 left-0 bg-white shadow z-10 rounded hidden`
                    }
                >
                    <ul className="pt-3">
                        {searched && productSearched.length > 0 ? (
                            productSearched.map((product) => {
                                return (
                                    <li key={product.id}>
                                        <Link to={`/products/${product.id}`}>
                                            <div className="flex items-center shadow mx-3 mb-3 py-4 rounded hover:shadow-primaryColor">
                                                <div className="w-[40px] h-[40px] mx-4 shadow">
                                                    <img
                                                        className="w-full h-full object-cover "
                                                        src={product.imageUrl}
                                                        alt={product.title}
                                                    />
                                                </div>
                                                <h4 className="text-textColor font-bold">{product.title}</h4>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="flex items-center justify-center shadow mx-3 mb-3 py-4 rounded">
                                <h2 className="text-textColor font-bold">Not Found Product</h2>
                            </li>
                        )}
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default Search;
