import React, { useState } from 'react';
import './apiTerminal.css'; // Import your CSS file here

const ApiTerminal = ({ clientN, explorerId, productName, workflowName, taskId }) => {
  const [clientNr, setClientNr] = useState('111111');
  const [gwoken, setGwoken] = useState('saasasasas');
  const [chatbotKey, setChatbotKey] = useState('chatbot199');
  const [username, setUsername] = useState('Rodolfo Dominguez');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      clientNr,
      gwoken,
      chatbotKey,
      username,
    };

    setResponse(''); // Clear the response

    fetch('https://apis.gwocu.com/api/users/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setResponse(JSON.stringify(response, null, 2));
      })
      .catch((error) => {
        setResponse(JSON.stringify(error, null, 2));
      });
  };

  return (
    <div className="container">
      <div className="page">
        <div className="curl-panel">
          <form id="form" onSubmit={handleSubmit}>
            <div className="input-fields">
              <div>1  // API EXPLORER. NOTE, FIELDS ARE EDITABLE!!</div>
              <div>2  //</div>
              <div>3  // This API allows you to query the information of a user. Note that the user must have been previously created.</div>
              <div>4  // The URL is https://apis.gwocu.com/api/users/query</div>
              <div>5  //</div>
              <div>
                6  curl -X POST "https://apis.gwocu.com/api/users/query" -H 'Content-Type: application/json' -d {' '}
              </div>
              <div>
                7  "clientNr": "<input
                  title="The clientNr is a unique identifier for each client. It is a required string."
                  className="mycurlinput"
                  type="text"
                  id="clientNr"
                  name="clientNr"
                  value={clientNr}
                  onChange={(e) => setClientNr(e.target.value)}/>",
              </div>
              <div>
                8  "gwoken": "<input
                  title="The gwoken is a digital signature that authenticates the API call. It is a required string."
                  className="mycurlinput"
                  type="text"
                  id="gwoken"
                  name="gwoken"
                  value={gwoken}
                  onChange={(e) => setGwoken(e.target.value)}
                />",
              </div>
              <div>
                9  "chatbotKey": "<input
                  title="The chatbotKey is the chatbotKey of the chatbot that calls the API. It is a required string."
                  className="mycurlinput"
                  type="text"
                  id="chatbotKey"
                  name="chatbotKey"
                  value={chatbotKey}
                  onChange={(e) => setChatbotKey(e.target.value)}
                />",
              </div>
              <div>
                10 "username": "<input
                  title="The user name identifies a the user. It is a required string."
                  className="mycurlinput"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />",
              </div>
              <div>11 "}"</div>
            </div>
            <p></p>
            <input type="submit" value="EXECUTE CODE" />
          </form>
        </div>
        <div className="panel panel-d">
          <h2>TERMINAL</h2>
          <div id="terminal-prompt"></div>
          <pre id="response" className="typing-effect">
            {response}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTerminal;
