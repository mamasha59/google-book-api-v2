"use client"
import getBooks from "@/app/libs/getBooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBooks, addIntoArray, loading } from "@/store/slices/booksSlice";
import React from "react";
import { Header } from "../components/Header/Header";
import { usePathname } from "next/navigation";

type iFilter = {children: React.ReactNode}

const Layout:React.FC<iFilter> = ({children}) => { // COMPONENT

  const [categoryValue, setCategoryValue] = React.useState<string>('');      //--- хук селекта категории
  const [sortValue, setSortValue] = React.useState<string>('relevance');    //--- хук селекта время
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false); // --- локальное состояние для кнопки Загрузить еще

  const inputElement = React.useRef<HTMLInputElement>(null!);             //----хук импута

  const dispatch = useAppDispatch(); 
  const books = useAppSelector(state => state.booksSlice);
  const router = usePathname();

  const handleSubmit = async (e:React.MouseEvent<HTMLFormElement>):Promise<void> => { // нажатие ПОИСК
    e.preventDefault();
    dispatch(loading(true));
    if(inputElement.current){
      const booklist = await getBooks({query:inputElement.current.value, value:categoryValue, valueTime:sortValue});
      dispatch(addBooks(booklist))   
    }
    dispatch(loading(false));
  }

  const handleSelectCategories = (event: React.ChangeEvent<HTMLSelectElement>):void => { // значение селекта категорий
    const value = event.target.value;
    setCategoryValue(value);
  }

  const handleSelectSort = (event: React.ChangeEvent<HTMLSelectElement>):void => { // значение селекта времени
    const value = event.target.value;
    setSortValue(value);
  }

  const [startIndex, setStartIndex] = React.useState(10);
  let maxResults = 30;

  const loadMoreBooks = async ():Promise<void> => {
    setIsLoadingMore(true);
    const booklistNew = await getBooks({query:inputElement.current.value, value:categoryValue, valueTime:sortValue, startIndex:startIndex, maxResults:maxResults});
    if(books.totalItems > books.items.length){
      console.log(books.totalItems - books.items.length);
      
    }
    dispatch(addIntoArray(booklistNew.items));
    setStartIndex(startIndex + 10);
    setIsLoadingMore(false);
  }

  return (
    <>
      <Header handleSubmit={handleSubmit} handleSelectCategories={handleSelectCategories} handleSelectSort={handleSelectSort} inputElement={inputElement}/>
      {children}
      {books.items.length > 0 && router === '/' && books.items.length < books.totalItems && !books.isLoading && (
        <button onClick={loadMoreBooks} className="flex items-center mx-auto border my-4 px-3 py-2 font-bold bg-gray-300">
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
    );
};

export default Layout;
