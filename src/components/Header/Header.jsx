import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <div>
      <header className='container mx-auto max-w-5xl'>
        <div className='grid grid-flow-col'>
          <div className="py-6">
            <h1 className= "" >logo</h1>
          </div>
          <ul className='flex py-6 px-3'>
            <li >
              <a className='pl-14 text-lg font-bold ' href="/">
                Home
              </a>
            </li>
            <li>
              <a className='pl-14 text-lg font-bold ' href="/products">
                  Our Products
              </a>
            </li>
            <li>
              <a className='pl-14 text-lg font-bold ' href="/about">
                About
              </a>
            </li>
            <li>
              <a className='pl-14 text-lg font-bold ' href="/contact">
                Contact
              </a>
            </li>
          </ul>

          <div className='py-6'>
          <FontAwesomeIcon icon={faBagShopping} />
          </div>
        </div>

      </header>
    </div>
  )
}

export default Header