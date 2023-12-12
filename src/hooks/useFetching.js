import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (params) => {
        try {
            setIsLoading(true)
            await callback(params)
        } catch (e) {
            setError(e.message)

        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    return [fetching, isLoading, error]
}