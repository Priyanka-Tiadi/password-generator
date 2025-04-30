import React, { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import './style.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const symbol = '!@#$%^&*()_+~|}{[]:;?><,./-=';

    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumber) chars += number;
    if (includeSymbol) chars += symbol;

    if (!chars) {
      setPassword('');
      return;
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied!');
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumber, includeSymbol ]);

  // Function to determine the width percentage based on the password length
  const getStrengthWidth = () => {
    if (length >= 1 && length <= 5) return '33%'; // Red (1-5 characters)
    if (length >= 5 && length <= 7) return '66%'; // Orange (5-7 characters)
    return '100%'; // Green (7+ characters)
  };

  // Function to determine the color class for the divider
  const getStrengthColor = () => {
    if (length >= 1 && length <= 5) return 'red';
    if (length >= 5 && length <= 7) return 'orange';
    return 'green';
  };

  return (
    <div className="main-container">
      <div className="password-display">
        <div className="password-text">{password || 'Generate a password'}</div>
        <div className="password-icons">
          <FiCopy onClick={copyToClipboard} title="Copy password" />
          <FiRefreshCw onClick={generatePassword} title="Generate new password" />
        </div>
      </div>

      {/* Divider Section with dynamic width and color */}
      <div className={`divider ${getStrengthColor()}`} style={{ width: getStrengthWidth() }}></div>

      <div className="customize-section">
        <h2>Customize your password</h2>

        <div className="length-control">
          <label>Password Length</label>
          <div className="length-input">
            <input
              type="number"
              min={1}
              max={52}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="options">
          <div className="option">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
            />
            <span>Uppercase</span>
          </div>

          <div className="option">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
            />
            <span>Lowercase</span>
          </div>

          <div className="option">
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={() => setIncludeNumber(!includeNumber)}
            />
            <span>Numbers</span>
          </div>

          <div className="option">
            <input
              type="checkbox"
              checked={includeSymbol}
              onChange={() => setIncludeSymbol(!includeSymbol)}
            />
            <span>Symbols</span>
          </div>
        </div>

        <button className="copy-button" onClick={copyToClipboard}>Copy Password</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
