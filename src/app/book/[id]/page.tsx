"use client"
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Book = () => {

  const currentBook = useAppSelector(state => state.booksSlice.bookDetails);
  const router = useRouter();

  return (
    <section className='mx-auto my-0 max-w-7xl flex justify-center p-3 sm:flex-col'>
      <div className='flex justify-center bg-slate-200 w-[40%] p-2 sm:w-full'>
          <Image
            width={300}
            height={300}
            className=' h-auto'
            src={currentBook.volumeInfo?.imageLinks?.thumbnail || ''}
            alt={`обложка книги:${currentBook.volumeInfo?.title}`}
            />
      </div>
       <div className='w-[60%] p-2 sm:w-full'>
          <p><span className="text-blue-500">Category</span> - {currentBook.volumeInfo?.categories || <span className='text-gray-500'>Информация о категории отсутствует...</span>}</p>
          <h2><span className="text-blue-500">Title</span> - {currentBook.volumeInfo?.title || <span className='text-gray-500'>Информация об названии отсутствует...</span>}</h2>
          <p><span className="text-blue-500">Author</span> - {currentBook.volumeInfo?.authors || <span className='text-gray-500'>Информация об авторе отсутствует...</span>}</p>
          <p><span className="text-blue-500">Description</span> - {currentBook.volumeInfo?.description ||<span className='text-gray-500'>Описание отсутствует...</span>}</p>
      </div>
        <button onClick={()=> router.back()} className='text-xs flex'>Back to results</button>
    </section>
  )
};

export default Book;
