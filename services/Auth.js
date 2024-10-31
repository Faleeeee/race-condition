export function login(email, password) {
    console.log('Đang gửi yêu cầu đăng nhập...');
    return fetch('http://127.0.0.1:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            console.log('Phản hồi từ server:', response);
            if (!response.ok) {
                throw new Error('Login Failed');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Lỗi trong quá trình login: ', error);
            throw error;
        });
}
