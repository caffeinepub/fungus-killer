import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    contactInfo: string;
    name: string;
    message: string;
    timestamp: Time;
}
export interface Order {
    name: string;
    mobile: string;
    address: string;
    city: string;
    pincode: string;
    quantity: bigint;
    timestamp: Time;
}
export type Time = bigint;
export type UserRole = { __kind__: "admin" } | { __kind__: "user" } | { __kind__: "guest" };
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    submitContactForm(name: string, contactInfo: string, message: string): Promise<string>;
    submitOrder(name: string, mobile: string, address: string, city: string, pincode: string, quantity: bigint): Promise<string>;
    getOrders(): Promise<Array<Order>>;
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
}
