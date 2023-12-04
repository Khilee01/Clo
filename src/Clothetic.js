import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Clothetic.css';

function Clothetic() {
    // Define the lists of options for each category
    let output
    const [favColorList] = useState([
        'Red', 'Green', 'Blue', 'Orange', 'Black', 'White'
    ]);
    const [skinToneList] = useState(['Fair Skin Tone', 'Light Skin Tone', 'Lighter Skin Tone', 'Medium Skin Tone', 'Tanned Skin Tone']);
    const [interestStyleList] = useState(['Mix and Match', 'Darker Clothes', 'Lighter Clothes', 'Elegant', 'Casual', 'Modern', 'Edgy', 'Romantic', 'Classic', 'Minimalist']);

    // Define state variables to control the visibility of each options list
    const [showColorOptions, setShowColorOptions] = useState(true);
    const [showSkinToneOptions, setShowSkinToneOptions] = useState(false);
    const [showInterestStyleOptions, setShowInterestStyleOptions] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('')
    const [secondaryColor, setSecondaryColor] = useState('')


    // Define a state variable to store the selected options
    const [selectedOptions, setSelectedOptions] = useState({
        favColor: '',
        skinTone: '',
        interestStyle: ''
    });

    // Use the useEffect hook to log the selected options whenever they change
    useEffect(() => {
        console.log(selectedOptions);

    }, [selectedOptions]);

    // Define click handlers for each options list
    const handleColorClick = (color) => {
        setSelectedOptions(prevState => ({ ...prevState, favColor: color }));  // Store the selected color
        setShowColorOptions(false);
        setShowSkinToneOptions(true);
    }

    const handleSkinToneClick = (skinTone) => {
        setSelectedOptions(prevState => ({ ...prevState, skinTone: skinTone }));  // Store the selected skin tone
        setShowSkinToneOptions(false);
        setShowInterestStyleOptions(true);
    }

    const handleInterestStyleClick = (style) => {
        setSelectedOptions(prevState => ({ ...prevState, interestStyle: style }));  // Store the selected interest style
        setShowInterestStyleOptions(false);


        const requestOptions = {
            method: 'POST',
            url: 'http://localhost:5000/predict', // Replace with your server URL
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: {...selectedOptions}
        }
        
        axios(requestOptions)
        .then(response =>{
            console.log(response.data);
            output = response.data;
            setPrimaryColor(output.primary_color)
            setSecondaryColor(output.secondary_color)
        }
        )
        .catch(error => console.log(error))
    }
 
    // Render the component
    return (
        <div className="chatPage">
            <h1 className="chatbot-heading">Meet Your Clobot</h1>
            <div className="bot">
                <img className="image" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/chatbot-bot-img.png" />
                <div className="chat-container" id="chatContainer">
                    <p className="msg-to-chatbot-container">
                        Hey Welcome on the journey to discover your best fit!
                    </p>
                    {showColorOptions && 
                        <>
                            <p className="msg-to-chatbot-container" id="pickColor">
                                Pick your Favourite Color
                            </p>
                            <ul className="options" id="favColor">
                                {favColorList.map((color, index) => (
                                    <li key={index} id={`color-option-${index}`} onClick={() => handleColorClick(color)}>{color}</li>
                                ))}
                            </ul>
                        </>
                    }
                    {showSkinToneOptions && 
                        <>
                            <p className="msg-to-chatbot-container" id="skinTone">
                                Choose Your Skin Tone
                            </p>
                            <ul className="options" id="skin">
                                {skinToneList.map((skinTone, index) => (
                                    <li key={index} id={`skin-tone-option-${index}`} onClick={() => handleSkinToneClick(skinTone)}>{skinTone}</li>
                                ))}
                            </ul>
                        </>
                    }
                    {showInterestStyleOptions && 
                        <>
                            <p className="msg-to-chatbot-container" id="style">
                                Pick Your Interest Style
                            </p>
                            <ul className="options" id="style">
                                {interestStyleList.map((style, index) => (
                                    <li key={index} id={`style-option-${index}`} onClick={() => handleInterestStyleClick(style)}>{style}</li>
                                ))}
                            </ul>
                        </>
                    }

                        <>
                        <p className="msg-to-chatbot-container">
                            The primary Color suggestion would be {primaryColor}
                        </p>
                        <p className="msg-to-chatbot-container">
                            The secondary Color suggestion would be {secondaryColor}.
                        </p>
                        </>
                </div>
            </div>
            <div className="user">
                <img className="image" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/chatbot-boy-img.png" />
            </div>
            <div className="">
                <input className="user-input" id="userInput" />
            </div>
        </div>
    );
}

export default Clothetic;
