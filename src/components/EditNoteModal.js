import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

function EditNoteModal(modalProps) {

    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const [newNoteTitle, setNewNoteTitle] = React.useState("");
    const [newNoteText, setNewNoteText] = React.useState("");

    React.useEffect(() => {
        if (modalProps.editID !== "") {
            setNewNoteTitle(modalProps.notes[modalProps.editID].noteTitle);
            setNewNoteText(modalProps.notes[modalProps.editID].noteBody);
        }
    }, [modalProps.editID]);

    const handleNewNoteTextChange = (event) => {
        let val = event.target.value;
        setNewNoteText(val);
    };

    const handleNewNoteTitleChange = (event) => {
        let val = event.target.value;
        setNewNoteTitle(val);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const id = modalProps.notes[modalProps.editID]._id;
        const res = await axios.put(
            `${apiURL}/api/updateNote/${id}`,
            {
                noteTitle: newNoteTitle,
                noteBody: newNoteText,
            },
            {
                headers: {
                    Authorization: `Bearer ${modalProps.token}`,
                },
            }
        );
        modalProps.setNotes((prev) => {
            prev.splice(modalProps.editID, 1);
            prev.unshift(res.data);
            return prev;
        });
        setNewNoteTitle("");
        setNewNoteText("");
        modalProps.setEditID("");
        modalProps.onClose();
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        const id = modalProps.notes[modalProps.editID]._id;
        const res = await axios.delete(
            `${apiURL}/api/deleteNote/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${modalProps.token}`,
                },
            }
        );
        modalProps.setNotes((prev) => {
            prev.splice(modalProps.editID, 1);
            return prev;
        });
        setNewNoteTitle("");
        setNewNoteText("");
        modalProps.setEditID("");
        modalProps.onClose();
    };

    return (
        <Modal
            isOpen={modalProps.isOpen}
            onClose={() => {
                setNewNoteTitle("");
                setNewNoteText("");
                modalProps.setEditID("");
                modalProps.onClose();
            }}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={onSubmit}>
                        <FormControl>
                            <FormLabel>Note Title</FormLabel>
                            <Input
                                value={newNoteTitle}
                                onChange={handleNewNoteTitleChange}
                                type="text"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Note Content</FormLabel>
                            <Textarea
                                placeholder="Start typing"
                                value={newNoteText}
                                height={"200px"}
                                required
                                onChange={handleNewNoteTextChange}
                            />
                        </FormControl>
                        <div
                            className="form-buttons"
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "1rem",
                            }}
                        >
                            <Button
                                mr={3}
                                onClick={() => {
                                    setNewNoteTitle("");
                                    setNewNoteText("");
                                    modalProps.setEditID("");
                                    modalProps.onClose();
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                mr={3}
                                colorScheme="red"
                                onClick={handleDelete}
                            >
                                Delete Note
                            </Button>
                            <Button
                                type="submit"
                                backgroundColor={"#52b788"}
                                style={{
                                    color: "#fff",
                                }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default EditNoteModal;
