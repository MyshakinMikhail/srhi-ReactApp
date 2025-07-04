import classes from "./DeleteFile.module.css";

interface Parse {
    deleteFile: () => void;
}

export const DeleteFile = ({ deleteFile }: Parse) => {
    return (
        <svg
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={deleteFile}
            className={classes.button}
        >
            <rect width="87" height="87" rx="20" fill="white" />
            <path
                d="M36 57C35.175 57 34.469 56.7065 33.882 56.1195C33.295 55.5325 33.001 54.826 33 54V34.5H31.5V31.5H39V30H48V31.5H55.5V34.5H54V54C54 54.825 53.7065 55.5315 53.1195 56.1195C52.5325 56.7075 51.826 57.001 51 57H36ZM39 51H42V37.5H39V51ZM45 51H48V37.5H45V51Z"
                fill="#FF5F00"
            />
        </svg>
    );
};
