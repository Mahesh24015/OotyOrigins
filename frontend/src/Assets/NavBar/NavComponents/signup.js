import axios from "axios";

export function signup(e,formData,setsnackMessage, handleClicksnack,setisUser, setErrors, setToken, setIsUserError, errors, validateForm, setFormData) {
    e.preventDefault(); // Prevent default form submission

    if (validateForm(formData, setisUser, setErrors)) {
        setFormData({
            username: '',
            email: '',
            password: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            isUser: '',
        });
        setErrors({});
        const user = {// Implement a function to generate a unique user ID
            username: formData.username,
            email: formData.email,
            password: formData.password, // Implement a function to hash the password
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode,
            },
            phone: formData.phone,
            createdAt: new Date(),
            updatedAt: new Date(),
            IsUser: formData.isUser == "true" ? true : false,
        };
        console.log('Form data submitted:', user);
        axios.post('http://localhost:4000/signup', user).then(res => {
            console.log(res.data);
            const data = res.data;
            localStorage.setItem('Token', data.jwtToken);
            setToken(data.jwtToken);
            localStorage.setItem('username', data.username)
            console.log(data.jwtToken);
            setsnackMessage("Log in Succesfull!");
            handleClicksnack();
        }).catch(function (error) {
            console.log(error);
            setsnackMessage("Login Failed Succesfully!");
            handleClicksnack();
        })
    } else {
        console.log('Validation failed:', errors);
    }
    setIsUserError("");

};