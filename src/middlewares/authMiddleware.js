import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token no válido' });
        }

        req.usuarioId = decoded.id;
        next();
    });
};

export default verificarToken;

