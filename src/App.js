import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import "./App.css";
import CreateNoteModal from "./components/CreateNoteModal";
import EditNoteModal from "./components/EditNoteModal";
import NavBarContainer from "./components/Navbar";
import Note from "./components/Note";
import { auth } from "./firebase/firebase";
import { FcGoogle } from "react-icons/fc"; 

function App() {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const [notes, setNotes] = React.useState();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState();
    const [tokenState, setToken] = React.useState("");
    const [editID, setEditID] = React.useState('');

    React.useEffect(() => {
        auth.onAuthStateChanged(async (userCred) => {
            if (userCred) {
                setIsLoggedIn(true);
                const token = await userCred.getIdToken();
                setToken(token);
                const user = await userCred;
                setUser(user);
            }
        });
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenEditModal,
        onOpen: onOpenEditModal,
        onClose: onCloseEditModal,
    } = useDisclosure();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(
                auth,
                new GoogleAuthProvider()
            );
            setIsLoggedIn(true);
            setUser(result.user);
            const userToken = await result.user.getIdToken();
            const res = await axios.post(
                `${apiURL}/api/createUser`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (tokenState) {
            fetchNotes();
        }
    }, [tokenState]);

    const fetchNotes = async () => {
        const res = await axios.get(`${apiURL}/api/userNotes`, {
            headers: {
                Authorization: `Bearer ${tokenState}`,
            },
        });
        console.log(res.data);
        setNotes(res.data);
        console.log(notes);
    };

    return (
        <ChakraProvider>
            <div className="App">
                {isLoggedIn && (
                    <NavBarContainer
                        setIsLoggedIn={setIsLoggedIn}
                        setToken={setToken}
                        setNotes={setNotes}
                        user={user}
                        setUser={setUser}
                        onOpen={onOpen}
                        className="navbar"
                    />
                )}
                {!isLoggedIn ? (
                    <div className="hero-container">
                        <div className="hero-menu">
                            <h1 className="hero-title">
                                Create Personal Notes
                            </h1>
                            <Button maxWidth={'200px'} onClick={handleGoogleLogin}>
                                <FcGoogle
                                    fontSize={"1.4rem"}
                                    style={{ marginRight: "8px" }}
                                />
                                Login with Google
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        {notes && (
                            <div className="notes">
                                {notes.map((note, index) => (
                                    <Note
                                        setEditID={setEditID}
                                        note={note}
                                        key={index}
                                        id={index}
                                        handleClick={onOpenEditModal}
                                    />
                                ))}
                            </div>
                        )}
                        <CreateNoteModal
                            setNotes={setNotes}
                            isOpen={isOpen}
                            onClose={onClose}
                            token={tokenState}
                            motionPreset="slideInBottom"
                        />
                        <EditNoteModal
                            notes={notes}
                            editID={editID}
                            setEditID={setEditID}
                            setNotes={setNotes}
                            isOpen={isOpenEditModal}
                            onClose={onCloseEditModal}
                            token={tokenState}
                            motionPreset="scale"
                        />
                    </div>
                )}
            </div>
        </ChakraProvider>
    );
}

export default App;
