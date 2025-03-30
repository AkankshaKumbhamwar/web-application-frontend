import { createContext, useContext, useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } from "../utils/env_config";

console.log({ VITE_GOOGLE_CLIENT_ID }, "------GOOGLE_CLIENT_ID-----------");

const CLIENT_ID = `${VITE_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const GoogleAuthContext = createContext<any>(null);

export const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [gapiLoaded, setGapiLoaded] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        function initClient() {
            gapi.client
                .init({
                    apiKey: VITE_GOOGLE_CLIENT_SECRET,
                    clientId: CLIENT_ID,
                    scope: SCOPES,
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                })
                .then(() => {
                    setGapiLoaded(true);
                    const auth = gapi.auth2.getAuthInstance();
                    console.log(auth, "-----------getAuthInstance----------");
                    setUser(auth.currentUser.get());
                    auth.isSignedIn.listen(setUser);
                })
                .catch((error: any) => console.error("GAPI Initialization failed", error));
        }

        gapi.load("client:auth2", initClient);
    }, []);

    const signIn = () => gapi.auth2.getAuthInstance().signIn();
    const signOut = () => gapi.auth2.getAuthInstance().signOut();

    return (
        <GoogleAuthContext.Provider value={{ user, signIn, signOut, gapiLoaded }}>
            {children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
