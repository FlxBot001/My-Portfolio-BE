import axios from "axios";
import { useState, useEffect } from "react"

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false)
            } catch (error) {
                setLoading(false);
            }
        }

        // fetch blog data only if category exists
        if (apiEndpoint) {
            fetchAllData()
        }
    }, [initialLoad, apiEndpoint]); // depends on initialload and apiendpoint to trigger api call

    return {alldata, loading}

}

export default useFetchData;