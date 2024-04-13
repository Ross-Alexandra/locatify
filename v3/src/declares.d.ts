declare module "*.html" {
    const content: string;
    export default content;
}

declare interface Window {
    locatify: any;
}
