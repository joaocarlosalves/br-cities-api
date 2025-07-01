import cors from "cors";

const allowed = [
    "http://localhost:3000", 
    "http://localhost:4000"
];
const options: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowed.includes(origin)) callback(null, true);
        else callback(new Error("Origin not allowed by CORS"));        
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

export default cors(options);
export { options }; 