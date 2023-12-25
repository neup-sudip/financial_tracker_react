import { useEffect, useState } from "react";

const Model = ({ handleClose, message, timer, handleConfirm }) => {
  const [time, setTime] = useState("");
  const [intervalId, setIntervalId] = useState("");

  useEffect(() => {
    if (timer) {
      setTime(timer);
      const interval = setInterval(() => {
        setTime((prev) => (prev || timer) - 1);
      }, [1000]);
      setIntervalId(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId);
      handleClose();
    }
  }, [time, handleClose, intervalId]);

  return (
    <div className="">
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog h-75 d-flex align-items-center justify-content-center">
          <div className="modal-content">
            <div className="modal-header px-4 py-2 d-flex align-items-center ">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              {timer && (
                <>
                  {time === 0 ? (
                    <h5 className="modal-title text-danger ">Time expired</h5>
                  ) : (
                    <h5 className="modal-title text-danger ">
                      Expires in {time}
                    </h5>
                  )}
                </>
              )}
              <div className="d-flex justify-content-between align-items-center bg-danger rounded-1">
                <button type="button" className="btn" onClick={handleClose}>
                  <i className="fa-solid fa-xmark text-white fa-xl"></i>
                </button>
              </div>
            </div>
            <div className="modal-body px-4">{message}</div>
            {handleConfirm && (
              <div className="text-end pe-4 pb-2 ">
                <button type="submit" className="btn btn-success">
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
