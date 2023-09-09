"use client"
import { useAppSelector } from "@/store/hooks";
import BookItem from "../BookItem/BookItem";

const Results = () => {
    const books = useAppSelector(state => state.booksSlice);
    console.log(books);
    
    const cut = (text:string) => { // если длина больше 15 символов, то обрезаем текст и заменяем на многоточие
        if(!text) return ''
        return text.length > 15 ? text.substring(0,15) + "...": text
    }

  return (
    <main className="mx-auto my-0 max-w-7xl flex flex-col justify-center p-3">
        <section className="flex justify-center flex-col items-center">
            <div className='flex justify-center'>
                {books.isLoading ? '' : books.totalItems > 0 && <p className='py-3'>{books.totalItems && `Found ${books.totalItems} results`}</p>}
            </div>
            {books.isLoading ? (<div className="">Loading...</div>) 
            : (books.items ? (
                    <div className='flex flex-wrap gap-3 justify-center'>
                    {books.items.map((book, index) => (
                        <BookItem
                        currentBook={book}
                        key={index}
                        img={book.volumeInfo.imageLinks?.thumbnail}
                        title={cut(book.volumeInfo?.title)}
                        author={cut(book.volumeInfo?.authors)}
                        category={cut(book.volumeInfo?.categories)}
                        />
                    ))}
                    </div>
                ) : (
                    <h3 className='books__error'>Ничего не найдено, либо введены некорректные данные...</h3>
            ))
            }
      </section>
    </main>
  );
};

export default Results;
