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
export declare const COULDINARY: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
};
export declare const GOOGLE: {
    jwtServiceAccountCredentials: any;
};
