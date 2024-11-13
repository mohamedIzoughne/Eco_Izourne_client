// src/hooks/useQueryParams.ts
import { useSearchParams } from 'react-router-dom'

interface QueryParams {
  [key: string]: string
}

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // Get all query parameters as an object
  const getQueryParams = (): QueryParams => {
    const params = Object.fromEntries([...searchParams])
    return {
      brand: params.brand || '',
      category: params.category || '',
      minPrice: params.minPrice || '0',
      maxPrice: params.maxPrice || '3500',
      searchTerm: params.searchTerm || '',
      sortBy: params.sortBy || 'auto',
      page: params.page || '1',
    }
  }

  // Update query parameters; merge new params with the existing ones
  const setQueryParams = (newParams: Partial<QueryParams>): void => {
    const currentParams = getQueryParams()
    const updatedParams = { ...currentParams, ...newParams }

    console.log('The new params', newParams)
    // Remove any keys with empty or null values
    for (const key in updatedParams) {
      if (!updatedParams[key]) {
        delete updatedParams[key]
      }
    }

    setSearchParams(updatedParams)
  }

  // Reset all query parameters
  const resetQueryParams = (): void => {
    setSearchParams({})
  }

  return {
    getQueryParams,
    setQueryParams,
    resetQueryParams,
  }
}

export default useQueryParams
