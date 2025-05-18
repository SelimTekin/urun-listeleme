import axios from 'axios';
import { Product } from '../models/Product';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
}