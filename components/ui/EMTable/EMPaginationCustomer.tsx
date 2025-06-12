'use client'
import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from 'antd';

interface EMPaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total:number;
}

const EMPaginationCustomer: FC<EMPaginationProps> = ({ hasNextPage, hasPrevPage,total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const per_page = parseInt(searchParams.get('per_page') ?? '10', 10);

  const handlePageChange = (newPage: number, pageSize?: number) => {
    router.push(
      `http://localhost:3000/customer/category/?page=${newPage}&per_page=${pageSize || per_page}`
    );
  };

  return (
    <div className='flex gap-2'>
   
      <Pagination
        current={page}
        total={total} // Replace '10' with the total number of items
        pageSize={per_page}
        pageSizeOptions={[5, 10, 20, 40]} // Define the available page size options
        showSizeChanger // Display the page size changer
        onShowSizeChange={handlePageChange}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default EMPaginationCustomer;









