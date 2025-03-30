import { useState } from "react";
import { saveAs } from "file-saver";
import { Button, Form } from "react-bootstrap";

export default function LetterEditor() {
    const [text, setText] = useState("");

    const handleSaveDraft = () => {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "letter_draft.txt");
    };

    return (
        <div className="d-flex flex-column align-items-center p-4">
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
                <Button variant="primary" onClick={handleSaveDraft}>
                    Save Draft
                </Button>
            </div>
        </div>
    );
}
