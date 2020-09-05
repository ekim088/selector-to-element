export { default as test, testNamedExport } from './testModule';
export const helloWorld = (name: string): string => `Hello ${name}`;
export default helloWorld;
