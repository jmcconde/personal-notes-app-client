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

function CreateNoteModal(modalProps) {
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const [newNoteTitle, setNewNoteTitle] = React.useState("");
    const [newNoteText, setNewNoteText] = React.useState("");

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
        const res = await axios.post(
            `${apiURL}/api/createNote`,
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
            prev.unshift(res.data);
            return prev;
        });
        setNewNoteTitle("");
        setNewNoteText("");
        modalProps.onClose();
    };

    return (
        <Modal
            isOpen={modalProps.isOpen}
            onClose={() => {
                setNewNoteTitle("");
                setNewNoteText("");
                modalProps.onClose();
            }}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Note</ModalHeader>
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
                                required
                                height={'200px'}
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
                            <Button mr={3} onClick={modalProps.onClose}>
                                Close
                            </Button>
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: "#52b788",
                                    color: "#fff",
                                }}
                            >
                                Create Note
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CreateNoteModal;
