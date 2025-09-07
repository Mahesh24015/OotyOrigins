export function  validateForm({formData,setIsUserError,setErrors}) {
        const newErrors = {};
        const phonePattern = /^\d{10}$/; // Adjusting regex for phone format
        const zipPattern = /^\d{6}$/;
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (!formData.street) newErrors.street = "Street is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.state) newErrors.state = "State is required.";
        if (!zipPattern.test(formData.zipcode)) newErrors.zipcode = "Zip Code must be 6 digits.";
        if (!phonePattern.test(formData.phone)) newErrors.phone = "Phone must be in the format +91XXXXXXXXXX.";
        if (!formData.isUser) { setIsUserError("This Field Is Required"); return false; }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };