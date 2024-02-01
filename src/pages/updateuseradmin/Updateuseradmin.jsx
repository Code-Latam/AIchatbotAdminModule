import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { encodebody, getDecodedBody } from "../../utils/utils.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from 'react-select';
import "./updateuseradmin.css";
import { useLocation } from 'react-router-dom';

export default function Updateuseradmin() {
    const location = useLocation();
    const { user, clientNr, source } = location.state;
  const formRef = useRef(null);
  const usernameRef = useRef();
  const selectedGroupsRef = useRef([]);
  const selectedExplorersRef = useRef([]);
  const [explorersPredefined, setExplorersPredefined] = useState([]);
  const [loadingExplorers, setLoadingExplorers] = useState(true); // New state to track loading state

  const history = useHistory();
 

  const predefinedGroups = [
    { value: 'apiFnyDesigners', label: 'ApiFny Designers' },
    { value: 'apiFnyUsers', label: 'ApiFny Users' },
    { value: 'chatbotDesigners', label: 'Chatbot Designers' },
    { value: 'chatbotUsers', label: 'ChatbotUsers' },
  ];

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'black' : 'black',
      borderColor: state.isFocused ? '#5cb85c' : '#4cae4c',
      boxShadow: state.isFocused ? '0 0 0 1px #5cb85c' : 'none',
      borderRadius: '10px',
      height: '50px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#98FF98',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'black',
      ':hover': {
        backgroundColor: '#4cae4c',
      },
    }),
  };

  useEffect(() => {
    const fetchExplorerData = async () => {
      const myPayload = {
        clientNr: clientNr
      };
      try {
        const response = await axios.post(process.env.REACT_APP_CENTRAL_BACK + "/explorer/queryall", myPayload);
        const explorerOptions = response.data.map((explorer) => ({
          value: explorer.explorerId,
          label: explorer.name,
        }));
        setExplorersPredefined(explorerOptions);
        selectedGroupsRef.current = user.groups.map(group => ({
            value: group,
            label: predefinedGroups.find(option => option.value === group)?.label || group,
          }));
          selectedExplorersRef.current = user.explorers.map(explorer => ({
            value: explorer,
            label: explorersPredefined.find(option => option.value === explorer)?.label || explorer,
          }));
      } catch (error) {
        console.error("Error fetching explorer data:", error);
      } finally {
        setLoadingExplorers(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchExplorerData();
  }, [clientNr]);

  const handleClick = async (e) => {
    e.preventDefault();
    const updatedUser = {
      clientNr: clientNr,
      chatbotKey:user.chatbotKey,
      email: user.email,
      username: usernameRef.current.value,
      groups: selectedGroupsRef.current.map(group => group.value),
      explorers: selectedExplorersRef.current.map(explorer => explorer.value)
    };

    console.log("UPDATED USER");
    console.log(updatedUser);
    console.log("GROUPS");
    console.log(updatedUser.groups);
    console.log("EXPLORES");
    console.log(updatedUser.explorers);
    const body = encodebody(updatedUser);
    try {
      // Use the user's email and chatbotKey to identify and update the user
      await axios.post(process.env.REACT_APP_CENTRAL_BACK + `/users/update/`, body);
      // alert("User has been updated");
      
      // history.goBack(); 
    } catch (err) {
      console.log("Error updating user:", err.response.data);
      alert(getDecodedBody(err.response.data));
    }
  };

  return (
    <div className="user">
      <div className="userWrapper">
        <div className="userLeft">
          <h3 className="userLogo">GWOCU Chat</h3>
          <span className="userDesc">
            Update user information.
          </span>
        </div>
        <div className="userRight">
          <form ref={formRef} className="userBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={usernameRef}
              defaultValue={user.username}
              className="userInput"
            />
            <input
              defaultValue={user.email}
              className="userInput"
              disabled
            />
            <Select
              isMulti
              defaultValue={user.groups.map(group => predefinedGroups.find(option => option.value === group))}
              onChange={(selectedOptions) => selectedGroupsRef.current = selectedOptions}
              options={predefinedGroups}
              placeholder="Choose roles..."
              styles={selectStyles}
            />
            {!loadingExplorers && (
              <Select
                isMulti
                defaultValue={user.explorers.map(explorer => explorersPredefined.find(option => option.value === explorer))}
                onChange={(selectedExplorerOptions) => selectedExplorersRef.current = selectedExplorerOptions}
                options={explorersPredefined}
                placeholder="Choose explorers..."
                styles={selectStyles}
              />
            )}
            <button className="userButton" type="submit">
              Update
            </button>
            <button className="userRegisterButton" onClick={() =>  history.goBack()}>Close</button>
          </form>
        </div>
      </div>
    </div>
  );
}
