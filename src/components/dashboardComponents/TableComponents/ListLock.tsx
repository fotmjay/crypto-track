// React & MUI
import React from "react";

// Icons
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

type Props = {
  toggleLock: boolean;
  setToggleLock: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListLock(props: Props) {
  return (
    <>
      {props.toggleLock ? (
        <LockOpenIcon sx={{ position: "absolute", left: "50px", top: "6px" }} fontSize="medium" onClick={() => props.setToggleLock((toggle) => !toggle)} />
      ) : (
        <LockIcon sx={{ position: "absolute", left: "50px", top: "6px" }} fontSize="medium" onClick={() => props.setToggleLock((toggle) => !toggle)} />
      )}
    </>
  );
}
