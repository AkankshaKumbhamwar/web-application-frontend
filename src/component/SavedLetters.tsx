import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "./GoogleAuthContext";

export default function SavedLetters() {
    const { user, signIn, gapiLoaded } = useGoogleAuth();
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        if (!gapiLoaded) return;
        if (!user) signIn();
        fetchFiles();
    }, [gapiLoaded, user]);

    const fetchFiles = async () => {
        if (!user) return;

        try {
            const response = await gapi.client.drive.files.list({
                q: "mimeType='application/vnd.google-apps.document'",
                fields: "files(id, name, webViewLink)",
            });

            setFiles(response.result.files);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    return (
        <div className="p-4">
            <h2>Saved Letters</h2>
            {files.length === 0 ? (
                <p>No saved letters found.</p>
            ) : (
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
