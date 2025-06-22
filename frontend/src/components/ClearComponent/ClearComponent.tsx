import classes from "./ClearComponent.module.css";

export const ClearComponent = ({ onClick }: { onClick: () => void }) => {
    return (
        <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.button}
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <rect width="70" height="70" rx="10" fill="#201B10" />
            <path
                d="M25.6667 44.3333L35.0001 35M35.0001 35L44.3334 25.6667M35.0001 35L25.6667 25.6667M35.0001 35L44.3334 44.3333"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
