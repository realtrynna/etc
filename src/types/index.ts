export interface HttpConfig {
    http: number;
}

export interface S3Config {
    region: string;
    bucket: string;
    accessKey: string;
    secretAccessKey: string;
}

export interface FileInfo {
    filename: string;
    mimeType: string;
    file: Buffer;
}
