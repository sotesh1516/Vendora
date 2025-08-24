import axios from "axios"

export const signUpUser = async (newUser) => {
    try {
        const result = await axios.post('http://127.0.0.1:8000/api/auth/signup', {
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

export const signInUser = async (inComingUser) => {
    try {
        const result = await axios.post('http://127.0.0.1:8000/api/auth/signin', {
                email: inComingUser.email,
                password: inComingUser.password
            });
    
        if (result.status == 200)
        {
            console.log("User signed in successfully:", result.data);
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
}

export const whoAmI = async (info) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/whoami', {
            headers: {
                Authorization: `Bearer ${info.accessToken}`
            }
        });

        if (response.status == 200) {
            console.log(response.data);
            return response.data;
          }
          console.error(
            "Server responded with an error during whoami check",
            response.status
          );

          return { error: "Server responded with an error during whoami check" };
          
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("User not authenticated - 401 error");
            return {
              error: "Please sign in",
              code: 401,
              requiresAuth: true,
            };
          }
      
          console.error("Error during whoami check");
          return { error: "whoami check failed. Please try again" };
    }
};