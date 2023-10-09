import { useAppDispatch } from "@/store/hooks";
import { bookDetails } from "@/store/slices/booksSlice";
import { BookItemProps } from "@/types/bookType";
import Image from "next/image";
import Link from "next/link";

interface BookProps {
  img: string,
  title: string,
  author: string,
  category: string,
  currentBook: BookItemProps,
}

const BookItem = ({img,title,author,category,currentBook}: BookProps) => {

 const oneCategory = (category:string):string => { 
  if(!category || category.length === 0) return '';
  return category[0];
 };

  const dispatch = useAppDispatch();

  const seeBookDetails = () => {
    dispatch(bookDetails(currentBook));
  }

  return (
    <Link
      className='bg-slate-400 max-w-[241px] min-h-[350px] w-full h-full flex items-center justify-center'
      onClick={seeBookDetails}
      href={`/book/${currentBook.id}`}
      >
    <div className="flex flex-col justify-between h-ful3">
        <div className="flex justify-center items-center mb-4">
         {img 
          ? <Image className="w-auto" width={120} height={120} src={img} alt={`обложка книги: "${title}"`}/>
          : 'нет обложки'
          }
        </div>
        <div className='w-full h-full flex flex-col'>
            <p className='text-xs'>{oneCategory(category)}</p>
            <h2 className='max-w-[200px]'>{title ? title : ''}</h2>
            <p className='max-w-[200px] text-xs text-gray-800'>{author ? author : ''}</p>
        </div>
    </div>  
    </Link> 
  )
};

export default BookItem;
