declare const _default: ({
    method: string;
    path: string;
    handler: string;
    config: {
        policies: any[];
        auth: {
            scope: string[];
        };
    };
} | {
    method: string;
    path: string;
    handler: string;
    config: {
        auth: boolean;
        policies: any[];
    };
})[];
export default _default;
