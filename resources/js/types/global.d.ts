import type { AxiosError } from "axios";

declare module "vue" {
    export interface ComponentCustomProperties {
        route: typeof import("ziggy-js").route;
    }
}

declare global {
    namespace PageProps {
        interface Props {
            auth?: {
                user?: {
                    id: number;
                    name: string;
                    email: string;
                };
            };
            toast?: {
                severity: "success" | "info" | "warn" | "error";
                summary: string;
                detail: string;
                life?: number;
            };
        }
    }
}

export {};
