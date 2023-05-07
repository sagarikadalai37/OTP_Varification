import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
const PhoneVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [error, setError] = useState(false);
  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // allow only numeric characters
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (!/^\d*$/.test(pastedData[i])) continue;
      if (i < 6) newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    inputRefs.current[0].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otp[index]) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }
    if (e.keyCode === 37 && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }
    if (e.keyCode === 39 && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length !== 6) {
//     if (otp.length !== 6) {
      setError(true);
    } else {
      setCounter(0);
      alert("Number Verified");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Phone Verification</h1>
      <p className="Otp">Enter the OTP you received on 79781-7XXXX</p>
      <div>
        {otp.map((value, index) => (
          <input
            type="text"
            maxLength="1"
            key={index}
            value={value}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            style={{ width: "20px", marginRight: "10px" }}
          />
        ))}
        <div>
          <a href="./" type="reset" className="left">
            Change Number
          </a>
          <a href="./" className="right">
            Re-send OTP
          </a>
        </div>
        <div className="counter">Verify Within : {counter} sec</div>
      </div>
      {error && <div style={{ color: "red" }}>Please enter a valid OTP</div>}
      <button onClick={handleVerify} className="btn">
        Verify Phone Number
      </button>
    </div>
  );
};

export default PhoneVerification;
