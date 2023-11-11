import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function vendor() {
  return (
    <Link to={"/Vendor"}>
          <span className='text-blue-700'>request proposal</span>
        </Link>
  )
}
