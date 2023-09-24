import React from "react";

function VideoInterview() {
  const [permissionError, setPermissionError] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [streamId, setStreamId] = useState("");
  const videoFrameRef = useRef();

    

  const send_blobs = async (blob_data) => {
    if (streamId) {
      sendBlobData( streamId, blob_data);
    } else {
      throw new Error("Stream Id not present");
    }
  };

  useEffect(() => {
    if (mediaRecorder && streamId) {
      mediaRecorder.ondataavailable = async (e) => {
        const reader = new FileReader();
        reader.onloadend = (_) => {
          const result = reader.result;
          const blob_data = new Blob([result], {
            type: "application/octet-stream",
          });
          send_blobs(blob_data);
        };
        reader.readAsArrayBuffer(e.data);
        //const blob_data = new Blob(e.data, { type: ' { type: 'video/ webm' }' });
      };
      mediaRecorder.start(5000);
    }
  }, [mediaRecorder, streamId]);

  const allowRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (permissionObj) => {
        setPermissionGranted(true);
        videoFrameRef.current.srcObject = permissionObj;
        const _streamId = await getStreamId(notifier, interview_id);
        if (_streamId) {
          setStreamId(_streamId);
        }
        setMediaRecorder(
          new MediaRecorder(videoFrameRef.current.srcObject, {
            mimeType: "video/webm",
          })
        );
      })
      .catch((error) => {
        console.error(error);
        setPermissionError(true);
      });
  };

  return (
    <div className="w-full">
      {" "}
      {!permissionGranted && (
        <>
          <label style={{ fontWeight: "600" }}>
            Click To give camera Permission
          </label>
          <button className="bg-prim rounded-full p-1 text-xl text-gray-900" onClick={allowRecording}>
            {" "}
            Start Camera
          </button>
        </>
      )}
      {permissionError && (
        <div className="alert-message">
          <span> Error: User did not grant camera permission</span>
        </div>
      )}
      <div className={`video-container ${permissionGranted ? "visible" : ""}`}>
        <video
          className="video-frame"
          autoPlay
          onLoadStart={(e) => {
            e.currentTarget.volume = 0;
          }}
          ref={videoFrameRef}
        ></video>
      </div>
    </div>
  );
}

export default VideoInterview;
