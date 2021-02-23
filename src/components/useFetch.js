import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        // setTimeout - to replicate actual server response time
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(error.message);
                    }
                })
        }, 2000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error};
}

export default useFetch;