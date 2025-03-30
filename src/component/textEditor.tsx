import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { Button, Form } from "react-bootstrap";
import { gapi } from "gapi-script";
import { useGoogleAuth } from "./GoogleAuthContext";

export default function LetterEditor() {
    const [text, setText] = useState("");
    const {  signIn, gapiLoaded }: any = useGoogleAuth();

    const uploadToGoogleDrive = async () => {
        if (!gapiLoaded) {
            alert("Google API not loaded yet. Try again.");
            return;
        }

        const accessToken = gapi.auth.getToken()?.access_token;
        if (!accessToken) {
            alert("Please sign in to Google first.");
            signIn();
            return;
        }

        const fileMetadata = {
            name: "My_Letter.doc",
            mimeType: "application/vnd.google-apps.document",
        };

        const formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(fileMetadata)], { type: "application/json" }));
        formData.append("file", new Blob([text], { type: "text/plain" }));

        try {
            const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
                method: "POST",
                headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
                body: formData,
            });

            const result = await response.json();
            console.log("Uploaded file:", result);
            alert("Letter saved to Google Drive!");
        } catch (error) {
            console.error("Error uploading to Google Drive", error);
            alert("Upload failed!");
        }
    };

    // Load saved draft from localStorage
    useEffect(() => {
        const savedDraft = localStorage.getItem("letterDraft");
        if (savedDraft) {
            setText(savedDraft);
        }
    }, []);

    // Save to localStorage whenever text changes
    useEffect(() => {
        localStorage.setItem("letterDraft", text);
    }, [text]);

    const handleSaveDraft = () => {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "letter_draft.txt");
    };

    const handleClear = () => {
        setText("");
        localStorage.removeItem("letterDraft");
    };

    return (
        <>
            <div className="d-flex flex-column align-items-center p-4 w-100">
                <h1 className="text-xl font-bold mb-4">Simple Letter Editor</h1>
                <Form.Control
                    as="textarea"
                    className="w-100 max-w-2xl p-2 border rounded"
                    placeholder="Write your letter here..."
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                    rows={10}
                />
                <div className="mt-4 d-flex gap-2">
                    <Button variant="danger" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleSaveDraft}>
                        Save Draft
                    </Button>

                    <Button variant="success" onClick={uploadToGoogleDrive}>
                        Upload to Google Drive
                    </Button>
                </div>
            </div>
        </>
    );
}
