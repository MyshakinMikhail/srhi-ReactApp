import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: React.ReactNode }) => {
    const portalRoot = document.getElementById("portal-root");

    if (!portalRoot) {
        console.error("portal-root не найден");
        return null;
    }

    return createPortal(children, portalRoot);
};
