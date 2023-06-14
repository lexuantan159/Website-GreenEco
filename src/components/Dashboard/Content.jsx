import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductsContext from '../../context/productsProvider';
import React, { useContext } from 'react'
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Content = () => {
  const { productsList } = useContext(ProductsContext);
  return (
    <main className='flex-1 ml-60'>
      <div className='sticky top-0 left-0 right-0 flex items-center justify-between py-5 px-10 border-2 border-gray-200 rounded-b-2xl bg-white'>
        <div>
          <h1 className='text-xl font-bold leading-relaxed text-gray-800'>List of Products</h1>
          <p className='text-sm font-sm text-gray-500'>Create your products on the store system</p>
        </div>
        <button className='inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-500 rounded-xl hover:bg-indigo-800'>
          <FontAwesomeIcon icon={faPlus}/>
          <span className='text-sm font-semibold tracking-wide'>Create new item</span>
        </button>
      </div>

      <table className='w-full'>
        <thead>
          <tr className='text-sm font-medium text-gray-700 border-b border-gray-200'>
            <td className='py-4 px-16'>Image</td>
            <td className='py-4 px-4'>Title</td>
            <td className='py-4 px-4 text-center'>Price</td>
            <td className='py-4 px-4 text-center'>Available</td>
            <td className='py-4 px-4 text-center'>Category</td>
          </tr>
        </thead>
        <tbody>
            {productsList.map(product => (
              <tr key={product.id} className='border-2 border-gray-200'>
                <td className='flex gap-x-4 item-center py-4 pl-14'>
                  <img src={product.imageUrl} className='w-16 aspect-[3/2 rounded-lg object-cover object-top border border-gray-200]' />
                </td>
                <td className='py-4'>{product.title}</td>
                <td className='py-4 px-8 text-center'>{product.price}</td>
                <td className='py-4 px-8 text-center'>{product.available}</td>
                <td className='py-4 px-8 text-center'>{product.category}</td>
                <td className='py-4 px-8 text-center'>
                  <Link to={`/admin/dashboard/edit-product/${product.id}`} className='px-2'><FontAwesomeIcon icon={faPenToSquare}/></Link>
                  <button className='px-2'><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  )
}

export default Content