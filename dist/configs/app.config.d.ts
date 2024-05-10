export declare const MONGO_DB: {
    uri: string;
};
export declare const AUTH: {
    expiresIn: string | number;
    data: string | {
        user: string;
    };
    jwtSecret: string;
    defaultPassword: string;
};
export declare const GOOGLE: {
    jwtServiceAccountCredentials: any;
};
