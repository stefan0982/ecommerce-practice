import { mongo }   from './mongo'
import { API_MAP } from './apiMap'

export const getProducts = () => {
  return mongo.get(`${API_MAP.allProducts}`, {})
}
