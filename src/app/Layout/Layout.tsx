"use client"
import React, { FC, useState, useRef } from "react";
import { Header } from "../components/Header/Header";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBooks, addIntoArray, loading } from "@/store/slices/booksSlice";
import getBooks from "@/app/libs/getBooks";

type FilterProps = { children: React.ReactNode };

const Layout: FC<FilterProps> = ({ children }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [sortValue, setSortValue] = useState("relevance");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null!);

  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.booksSlice);
  const router = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loading(true));

    if (inputElement.current) {
      getBooks({ query: inputElement.current.value, value: categoryValue, valueTime: sortValue })
        .then((booklist) => {
          dispatch(addBooks(booklist));
        })
        .catch((error)=> console.log("seomthing went wrong..." + error))
        .finally(() => {
          dispatch(loading(false));
        });
    }
  };

  const handleSelectCategories = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    setCategoryValue(value);
  };

  const handleSelectSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    setSortValue(value);
  };

  const [startIndex, setStartIndex] = useState(10);
  const maxResults = 30;

  const loadMoreBooks = (): void => {
    setIsLoadingMore(true);

    getBooks({ query: inputElement.current?.value, value: categoryValue, valueTime: sortValue, startIndex, maxResults })
      .then((booklistNew) => {
        if (books.totalItems > books.items.length) {
          console.log(books.totalItems - books.items.length);
        }
        dispatch(addIntoArray(booklistNew.items));
        setStartIndex(startIndex + 10);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  return (
    <>
      <Header
        handleSubmit={handleSubmit}
        handleSelectCategories={handleSelectCategories}
        handleSelectSort={handleSelectSort}
        inputElement={inputElement}
      />
      {children}
      {books.items.length > 0 && router === "/" && books.items.length < books.totalItems && !books.isLoading && (
        <button onClick={loadMoreBooks} className="flex items-center mx-auto border my-4 px-3 py-2 font-bold bg-gray-300">
          {isLoadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default Layout;