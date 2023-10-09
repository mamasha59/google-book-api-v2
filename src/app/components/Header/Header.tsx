import Link from "next/link";
import React from "react";

interface HeaderProps {
    handleSubmit: React.MouseEventHandler<HTMLFormElement>,
    handleSelectCategories: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSelectSort: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    inputElement: React.RefObject<HTMLInputElement>,
}

export const Header:React.FC<HeaderProps> = ({handleSubmit,handleSelectCategories,inputElement,handleSelectSort}) => {
  return (
    <header className="bg-slate-500 w-full border border-neutral-700 p-3">
        <div className="mx-auto my-0 max-w-7xl flex flex-col justify-center">
        <Link href={'/'}>
            <h1 aria-label="Найдем книгу" title="Найдем книгу" className='text-6xl text-white font-bold text-start mb-11'>Search for books</h1>
        </Link>
        <form className='mb-4 flex justify-center items-center flex-col' typeof='submit' onSubmit={handleSubmit}>
            <input
            aria-label="Введи запрос для поиска"
            title="Введи запрос для поиска"
            ref={inputElement}
            placeholder='Введи запрос для поиска'
            type='search'
            className='p-2 rounded-lg outline-none max-w-sm w-full text-center capitalize'
            required
            autoComplete='off'
            />
            <button title="Начать поиск" aria-label="Нажмите для поиска либо нажмите энтр" className='mt-3 text-white border px-3 rounded-sm text-2xl'>Поиск</button>
        </form>
        <div className="h-[1px] w-1/4 bg-black mx-auto my-3"></div>  {/*ДЕКОР ПОЛОСА*/}

        <section className='flex gap-4 flex-wrap items-center justify-center'>
            <div className='flex flex-col'>
                <label className='text-center'>Categories</label>
                <select name='select-what' className="min-w-[200px] p-1 flex" onChange={handleSelectCategories}>
                    <option defaultValue={'all'}>all</option>
                    <option value='art'>art</option>
                    <option value='biography'>biography</option>
                    <option value='computers'>computers</option>
                    <option value='history'>history</option>
                    <option value='medical'>medical</option>
                    <option value='poetry'>poetry</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className='text-center'>Sorting by</label>
                <select name='select-where' className="min-w-[200px] p-1" onChange={handleSelectSort}>
                    <option defaultValue={'relevance'}>relevance</option>
                    <option value='newest'>newest</option>
                </select>
            </div>
        </section>
        </div>
  </header>
  )
};
