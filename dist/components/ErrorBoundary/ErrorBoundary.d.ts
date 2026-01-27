import React, { Component, type ReactNode } from "react";
type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};
type State = {
    hasError: boolean;
};
export default class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map