import apiClient from "../utils/api-client"

export function getSuggistionAPI(search){
    return apiClient.get(`/products/suggestions?search=${search}`)
}