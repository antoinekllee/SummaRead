import React, { useState } from "react";
import "./App.css";
import ReaderButton from "./components/ReaderButton";

const App: React.FC = () => {
    const [isReaderEnabled, setIsReaderEnabled] = useState(false);

    // This function is called when the ReaderButton is clicked.
    // It sends a message to the content script to toggle the reader.
    // It also updates the state of the reader button.
    // The content script is the only part of the extension that can
    // access the DOM of the current page, so we need to send a message
    // to the content script to toggle the reader.
    const handleReaderButtonClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id!,
                { 
                    action: "toggleDeclutterPage" 
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        return;
                    }
                    setIsReaderEnabled(response.isReaderEnabled);
                }
            );
        });
    };

    return (
        <div className="App">
            <h1>SummaRead</h1>
            <ReaderButton
                onClick={handleReaderButtonClick}
                isReaderEnabled={isReaderEnabled}
            />
        </div>
    );
};

export default App;
