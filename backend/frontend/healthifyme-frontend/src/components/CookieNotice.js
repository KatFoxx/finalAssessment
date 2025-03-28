import React, { useState, useEffect } from 'react';

const CookieNotice = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (hasAcceptedCookies) {
      setAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    // Save the user's consent to localStorage
    localStorage.setItem('cookiesAccepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null; // Don't show the banner if the user has accepted

  return (
    <div>
      <div>
        <p>
          This website uses cookies that are essential for the operation of the site. By continuing to use our site, you agree to the use of these cookies.
        </p>
        <button onClick={handleAcceptCookies}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
