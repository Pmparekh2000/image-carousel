import { useEffect, useState } from "react"

const useFetchData = (API_LINK, ...props) => {
    const [data, setData] = useState([]);

    const fetchData = async (API_LINK) => {
        try {
            const readableStream = await fetch(API_LINK);
            const data = await readableStream.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(API_LINK);
    } , [...props]);

    return data;
};

export default useFetchData;