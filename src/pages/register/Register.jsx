import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import {encodebody, getDecodedBody} from "../../utils/utils.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from 'react-select';
import { useParams } from "react-router-dom";

export default function Register() {
  const {chatbotKey} = useParams();
  console.log("CHATBOTVALUE");
  console.log(chatbotKey);

  const formRef = useRef(null);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const { user: currentuser } = useContext(AuthContext);
  const clientNr = currentuser.clientNr;
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [explorers, setExplorers] = useState([]); 
  const [selectedExplorers, setSelectedExplorers] = useState([]);

  const predefinedGroups = [
    { value: 'apiFnyDesigners', label: 'ApiFny Designers' },
    { value: 'apiFnyUsers', label: 'ApiFny Users' },
    { value: 'chatbotDesigners', label: 'Chatbot Designers' },
    { value: 'chatbotUsers', label: 'ChatbotUsers' },
  ];

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'black' : 'black', // Darker background color when focused or not
      borderColor: state.isFocused ? '#5cb85c' : '#4cae4c', // Green border color when focused or not
      boxShadow: state.isFocused ? '0 0 0 1px #5cb85c' : 'none', // Green box shadow when focused or not
      borderRadius: '10px',
      height: '50px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#98FF98', // Green background color for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black', // Black text color for selected values
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'black', // Black text color for the "x" button to remove a selected value
      ':hover': {
        backgroundColor: '#4cae4c', // Darker green background color on hover for the "x" button
      },
    }),
    // Add more styles as needed
  };


  useEffect(() => {
    const fetchExplorerData = async () => {
      const myPayload = {
        clientNr: clientNr
      }
      try {
        const response = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/explorer/queryall",myPayload);

        // Assuming the response is an array of explorer objects
        const explorerOptions = response.data.map((explorer) => ({
          value: explorer.explorerId,
          label: explorer.name,
        }));

        setExplorers(explorerOptions);
      } catch (error) {
        console.error("Error fetching explorer data:", error);
      }
    };

    fetchExplorerData();
  }, [clientNr]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        clientNr: clientNr,
        chatbotKey: chatbotKey,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        groups: selectedGroups.map(group => group.value),
        explorers: selectedExplorers.map(explorer => explorer.value)
      };
      const body = encodebody(user);
      try {
        await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/auth/register", body);
        alert("User has been registered");
        formRef.current.reset(); // clear the form fields
        history.push(`/register/${chatbotKey}`);
      } catch (err) {
        console.log("return from api call");
        console.log(err.response.data);
        alert(getDecodedBody(err.response.data));
        }
    }
  };

  return (
    
    <div className="user">
      <div className="userWrapper">
        <div className="userLeft">
          <h3 className="userLogo">Podium Chat</h3>
          <span className="userDesc">
            Register all your users in one place.
          </span>
        </div>
        <div className="userRight">
          <form ref={formRef} className="userBox" onSubmit={handleClick}>
          <input
              placeholder="Chatbot Key"
              required
              value={chatbotKey}
              className="userInput"
              disabled
            />
            <input
              placeholder="Username"
              required
              ref={username}
              className="userInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="userInput"
              type="email"
              autocomplete="new-password"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="userInput"
              type="password"
              minLength="6"
              autocomplete="new-password"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="userInput"
              type="password"
            />
            
              <Select
                isMulti
                value={selectedGroups}
                onChange={(selectedOptions) => setSelectedGroups(selectedOptions)}
                options={predefinedGroups}
                placeholder="Choose roles..." 
                styles={selectStyles}
              />
              <Select
                isMulti
                value={selectedExplorers}
                onChange={(selectedOptions) => setSelectedExplorers(selectedOptions)}
                options={explorers}
                placeholder="Choose explorers..."
                styles={selectStyles}
              />
            <button className="userButton" type="submit">
              Register
            </button>
            <button className="userRegisterButton"  onClick={() => history.goBack()}>Close</button>
          </form>
        </div>
      </div>
    </div>
  
  );
}
