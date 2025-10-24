export interface Env {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_APP_NAME: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// const requiredEnv: (keyof Env)[] = ['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_APP_NAME', 'NODE_ENV'];

// requiredEnv.forEach((key) => {
//   if (!process.env[key]) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
// });

export const env: Env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME!,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
};
