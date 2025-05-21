import axios from "axios"

export const signUpUser = async (newUser) => {
    try {
        const result = await axios.post("API_URL", {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            });
    
        if (result.status == 200)
        {
            console.log("User registered successfully:", result.data);
            return result.data;
        }
        else {
            console.error("An error has occured", result.status);
            return {error: "an error has occured"};
        }
    } catch (error) {
        console.error("Error during the sign up process");
        return {error: "Sign up failed. PLease try again"};
    }
    
};