// @desc    Login user (MODE OFFLINE / BACKDOOR)
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === 'admin@katalogin.com' && password === 'admin123') {
            res.json({
                _id: "id_admin_palsu_123",
                name: "Admin Ganteng (Offline)",
                email: email,
                role: "admin",
                token: "token_palsu_yang_penting_bisa_masuk",
            });
        } else {
            res.status(401).json({ message: 'Email atau Password Salah Bro!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { authUser };