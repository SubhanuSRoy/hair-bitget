import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [noOfCVs, setNoOfCVs] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [allCVsGot, setallCVsGot] = useState(false);

  const [allCVs, setallCVs] = useState([]);

  const job = useSelector((state) => state.job);

  const [selectedCVs, setSelectedCVs] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  const [emailsLoading, setEmailsLoading] = useState(false);

  const onFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("pdfFile", file, file.name);
    formData.append("text", job.id);

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + "analyzeResume/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  const uploadFilesSequentially = async () => {
    setUploading(true);

    for (const file of selectedFiles) {
      const success = await uploadFile(file);
      if (!success) {
        setallCVsGot(true);
        break;
      }
    }
    getAllCVs();
    setUploading(false);
  };

  const fileData = () => {
    if (selectedFiles.length > 0) {
      return (
        <div>
          <h2>Selected Files:</h2>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>No files selected</h4>
        </div>
      );
    }
  };

  const getAllCVs = async () => {
    axios
      .post(process.env.REACT_APP_BACKEND + "startCVMatching", {
        jobId: job?.id,
      })
      .then((res) => {
        console.log(res.data.result);
        setallCVs(res.data.result);
        setCheckedState(new Array(res.data.result?.length).fill(false));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getAllCVs();
    setSelectedCVs([]);
  }, []);

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);

    if (newCheckedState[index]) {
      setSelectedCVs((prevSelectedCVs) => [...prevSelectedCVs, allCVs[index]]);
    } else {
      setSelectedCVs((prevSelectedCVs) =>
        prevSelectedCVs.filter((cv) => cv.unique_id !== allCVs[index].unique_id)
      );
    }
  };

  const sendEmails = async (e) => {
    console.log(selectedCVs);
    setEmailsLoading(true);
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND + "sendEmail", {
        sendEmails: selectedCVs,
      })
      .then((res) => {
        console.log(res.data);
        setEmailsLoading(false);
        alert("Emails sent successfully");
      })
      .catch((error) => {
        setEmailsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div className="w-full flex flex-col items-center text-white">
      <div className="flex items-center justify-center gap-4 bg-white rounded-md p-4 w-1/2">
        <input type="file" onChange={onFileChange} multiple />
        <button
          onClick={uploadFilesSequentially}
          disabled={uploading}
          className="bg-prim px-3 py-2 rounded-md text-gray-900"
        >
          Upload CVs
        </button>
        {uploading && (
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            className="w-20"
          />
        )}
      </div>

      {allCVsGot && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="font-bold text-lg">Uploaded CVS are: </div>{" "}
          {fileData()}
        </div>
      )}
      {!allCVsGot && (
        <div className="font-bold text-2xl my-4">
          Send Emails to selected CVs
        </div>
      )}
      {!allCVsGot &&
        allCVs?.map((cv, index) => (
          <div
            className="flex items-center justify-between w-full border-2 border-prim p-4 rounded-md mb-2"
            key={index}
          >
            <div className="flex gap-4 items-center w-3/4">
              <div className="font-bold text-lg w-1/2">
                Email: <span className="font-normal">{cv.emails[0]}</span>
              </div>
              <div className="font-bold text-lg w-1/2">
                Resume Score:{" "}
                <span className="font-normal text-prim ">{cv.score}</span>
              </div>
            </div>
            <input
              type="checkbox"
              value={cv.unique_id}
              checked={checkedState[index]}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ))}

      {/* <div>
        <h2>Selected CVs:</h2>
        <ul>
          {selectedCVs?.map((cv) => (
            <li key={cv.unique_id}>{cv.unique_id}</li>
          ))}
        </ul>
      </div> */}

      {!emailsLoading && <button
        onClick={sendEmails}
        className="bg-prim px-3 py-2 rounded-md text-gray-900 my-4"
      >
        Send Emails
      </button>}
      {emailsLoading && (
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            className="w-20"
          />
        )}
    </div>
  );
}

export default FileUpload;
