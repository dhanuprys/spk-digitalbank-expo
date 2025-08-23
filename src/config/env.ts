export const ENV = {
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://10.22.237.92:8440',
    // Add other environment variables here as needed
    // DATABASE_URL: process.env.EXPO_PUBLIC_DATABASE_URL,
    // API_KEY: process.env.EXPO_PUBLIC_API_KEY,
} as const;

export type Environment = typeof ENV;
