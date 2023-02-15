import { Button, Flex, Text } from "@chakra-ui/react";
import { auth } from "../firebase/firebase";

const NavBarContainer = (props) => {
    const handleLogout = async () => {
        props.setIsLoggedIn(false);
        props.setToken("");
        props.setUser("");
        props.setNotes('');
        await auth.signOut();
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="flex-end"
            padding={"1rem 2rem"}
            wrap="wrap"
            w="100%"
            top={0}
            left={0}
            gap={"2rem"}
            position="fixed"
            backgroundColor="#dcdfe0"
            className="navbar-content"
        >
            <Button
                onClick={props.onOpen}
                style={{ backgroundColor: "#52b788", color: "white" }}
                marginRight={"auto"}
                className='navbar-newnote'
            >
                New Note
            </Button>
            <Text className="navbar-email">{props.user.email}</Text>
            <Button onClick={handleLogout} colorScheme={"blue"}>
                Logout
            </Button>
        </Flex>
    );
};

export default NavBarContainer;
