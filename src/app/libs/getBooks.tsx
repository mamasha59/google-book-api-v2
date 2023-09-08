import { API_KEY, API_URL } from "../utils/utils";

interface getBooksProps {
    query: string,
    value: string,
    valueTime: string,
    startIndex?: number
    maxResults?: number,
}

const getBooks = async ({query,value,valueTime,startIndex,maxResults}: getBooksProps) => {
    console.log(startIndex,maxResults);
    
   const response = await fetch(`${API_URL}${query}${value}&orderBy=${valueTime}&key=${API_KEY}&startIndex=${startIndex || 0}&maxResults=${maxResults || 10}`)
   if(!response.ok) {
    throw new Error('не получилось получить данные...')
   }
   return response.json();
}

export default getBooks;
