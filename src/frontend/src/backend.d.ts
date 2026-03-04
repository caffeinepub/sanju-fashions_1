import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
}
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    category: Category;
    price: bigint;
}
export enum Category {
    everydayElegance = "everydayElegance",
    festive = "festive",
    casual = "casual"
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getInquiries(isAdmin: boolean): Promise<Array<Inquiry>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    submitInquiry(name: string, email: string, message: string): Promise<boolean>;
}
