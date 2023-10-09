import getAxiosInstance from './axiosProvider';
export async function adminSignIn({email, password}){
    let axiosInstance = getAxiosInstance();
    let response = await axiosInstance.post('/signin',
    {
        email: email,
        password: password
    }
    );
    return response;
}

export async function updateAdminProfile(token, formData){
    let axiosInstance=getAxiosInstance(token);
    
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    let response = await axiosInstance.put("/me", formData, config);

    return response;
}

export async function changePassword(token, {oldPassword, newPassword}){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post('/setPassword',
    {
        oldPassword,
        newPassword
    }
    );
    return response;
}

export async function resetPassword(token, {password}){
    let axiosInstance = getAxiosInstance();

    let response = await axiosInstance.post(`/resetPassword?token=${token}`,
    {
        password: password
    });

    return response;
}

export async function sendResetPasswordEmail({email}){
    let axiosInstance = getAxiosInstance();

    let response = await axiosInstance.post('/sendPasswordResetEmail',{
        email
    })

    return response;
}

export async function adminLogOut(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get('/signout')
    return response;
}